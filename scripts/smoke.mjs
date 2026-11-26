import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";

const PORT = process.env.SMOKE_PORT ?? "3100";
const PATHS = (process.env.SMOKE_PATHS ?? "/").split(",").map((p) => p.trim());
const TIMEOUT_MS = Number(process.env.SMOKE_TIMEOUT ?? 60) * 1000;
const BASE = `http://127.0.0.1:${PORT}`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

if (!existsSync(".next")) {
  console.error("Папку .next не знайдено. Спочатку виконайте `npm run build`.");
  process.exit(1);
}

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const server = spawn(process.execPath, [nextBin, "start", "-p", PORT], {
  stdio: ["ignore", "pipe", "pipe"],
  env: { ...process.env, PORT },
});

let serverLog = "";
server.stdout.on("data", (d) => (serverLog += d));
server.stderr.on("data", (d) => (serverLog += d));

let exited = false;
server.on("exit", () => (exited = true));

async function stopServer() {
  if (exited) return;
  server.kill("SIGTERM");
  for (let i = 0; i < 20 && !exited; i++) await sleep(100);
  if (!exited) server.kill("SIGKILL");
}

async function waitForServer() {
  const deadline = Date.now() + TIMEOUT_MS;
  while (Date.now() < deadline) {
    if (exited) throw new Error("Сервер завершився до готовності");
    try {
      await fetch(BASE, { signal: AbortSignal.timeout(2000) });
      return;
    } catch {
      await sleep(500);
    }
  }
  throw new Error(`Сервер не відповів за ${TIMEOUT_MS / 1000} с`);
}

const results = [];

async function checkPath(path) {
  const started = Date.now();
  try {
    const res = await fetch(BASE + path, {
      signal: AbortSignal.timeout(15000),
    });
    await res.text();
    const ms = Date.now() - started;
    results.push({ path, ok: res.status === 200, status: res.status, ms });
  } catch (err) {
    results.push({
      path,
      ok: false,
      status: String(err.message ?? err),
      ms: Date.now() - started,
    });
  }
}

function writeJUnit() {
  const failures = results.filter((r) => !r.ok).length;
  const esc = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  const cases = results
    .map(
      (r) =>
        `  <testcase classname="smoke" name="GET ${esc(r.path)}" time="${(r.ms / 1000).toFixed(3)}">` +
        (r.ok
          ? ""
          : `<failure message="Очікувався статус 200, отримано ${esc(r.status)}"/>`) +
        `</testcase>`,
    )
    .join("\n");
  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<testsuite name="smoke" tests="${results.length}" failures="${failures}">\n${cases}\n</testsuite>\n`;
  mkdirSync("reports", { recursive: true });
  writeFileSync("reports/smoke-junit.xml", xml);
}

let exitCode = 0;
try {
  await waitForServer();
  for (const p of PATHS) await checkPath(p);
  for (const r of results) {
    console.log(
      `${r.ok ? "PASS" : "FAIL"}  GET ${r.path}  -> ${r.status}  (${r.ms} мс)`,
    );
  }
  if (results.some((r) => !r.ok)) exitCode = 1;
} catch (err) {
  console.error("Smoke-тест не виконано:", err.message);
  console.error("--- лог сервера ---\n" + serverLog);
  results.push({
    path: "(запуск сервера)",
    ok: false,
    status: err.message,
    ms: 0,
  });
  exitCode = 1;
} finally {
  writeJUnit();
  await stopServer();
}

process.exit(exitCode);
