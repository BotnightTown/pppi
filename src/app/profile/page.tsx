import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/dal";
import { logoutAction } from "@/app/login/actions";

export const metadata: Metadata = {
  title: "Мій профіль",
};

export default function ProfilePage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="mb-8 font-[family-name:var(--font-serif)] text-3xl">
        Мій профіль
      </h1>
      {/* Доступ до cookies робить вміст динамічним, тому він у Suspense */}
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileContent />
      </Suspense>
    </section>
  );
}

async function ProfileContent() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const rows: { label: string; value: string }[] = [
    { label: "Ім'я", value: user.name },
    { label: "Email", value: user.email },
    { label: "Телефон", value: user.phone ?? "не вказано" },
    { label: "Адреса", value: user.address ?? "не вказано" },
    {
      label: "Роль",
      value: user.role === "ADMIN" ? "Адміністратор" : "Покупець",
    },
    {
      label: "Дата реєстрації",
      value: user.createdAt.toLocaleDateString("uk-UA", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
        <p className="mb-6 text-sm text-stone-600">
          Вітаємо,{" "}
          <span className="font-medium text-stone-900">{user.name}</span>!
        </p>
        <dl className="divide-y divide-stone-100">
          {rows.map((r) => (
            <div key={r.label} className="grid gap-1 py-3 sm:grid-cols-3">
              <dt className="text-sm text-stone-500">{r.label}</dt>
              <dd className="text-sm sm:col-span-2">{r.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-2xl border border-dashed border-stone-300 p-6 text-center text-sm text-stone-500">
        Історія замовлень з’явиться тут пізніше.
      </div>

      <form action={logoutAction}>
        <button
          type="submit"
          className="rounded-full border border-stone-900 px-6 py-2.5 text-sm transition-colors hover:bg-stone-900 hover:text-white"
        >
          Вийти
        </button>
      </form>
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="h-72 animate-pulse rounded-2xl border border-stone-200 bg-white" />
  );
}
