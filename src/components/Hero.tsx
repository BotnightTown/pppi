import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#efe4d3] via-[#f6efe4] to-[#e6d3b8]">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
        <div>
          <p className="mb-4 text-xs tracking-[0.3em] text-[#9a7b4f] uppercase">
            Нова колекція · Осінь 2026
          </p>
          <h1 className="font-[family-name:var(--font-serif)] text-4xl leading-tight sm:text-5xl lg:text-6xl text-black">
            Аромат, який
            <br />
            розповідає про вас
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-stone-600">
            Оригінальна парфумерія від світових брендів і нішевих домів. Оберіть
            самі або пройдіть короткий квіз — ми підберемо ідеальний варіант.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/catalog"
              className="rounded-full bg-stone-900 px-7 py-3 text-sm tracking-wide text-white transition-colors hover:bg-[#9a7b4f]"
            >
              Перейти до каталогу
            </Link>
            <Link
              href="/quiz"
              className="rounded-full border border-stone-900 px-7 py-3 text-sm tracking-wide transition-colors hover:bg-stone-900 text-black hover:text-white"
            >
              Підібрати аромат
            </Link>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative mx-auto flex h-72 w-full max-w-sm items-center justify-center sm:h-96"
        >
          <div className="absolute h-64 w-64 rounded-full bg-white/50 blur-2xl sm:h-80 sm:w-80" />
          <div className="relative flex h-56 w-36 flex-col items-center sm:h-72 sm:w-48">
            <div className="h-6 w-10 rounded-t-md bg-[#9a7b4f]" />
            <div className="h-3 w-16 bg-[#7d6240]" />
            <div className="flex-1 w-full rounded-2xl border border-white/70 bg-gradient-to-b from-white/80 to-[#d9bd93]/80 shadow-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
