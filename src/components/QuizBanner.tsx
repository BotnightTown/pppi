import Link from "next/link";

export default function QuizBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-6 rounded-3xl bg-stone-900 px-6 py-14 text-center text-stone-100 sm:px-12">
        <p className="text-xs tracking-[0.3em] text-[#d9bd93] uppercase">
          Fragrance Finder
        </p>
        <h2 className="max-w-2xl font-[family-name:var(--font-serif)] text-3xl sm:text-4xl">
          Не знаєте, що обрати? Відповісти на 5 питань — і ми підкажемо
        </h2>
        <p className="max-w-lg text-sm text-stone-400">
          Квіз враховує ваші вподобання, настрій і привід, щоб запропонувати
          найбільш підхожі аромати з нашого каталогу.
        </p>
        <Link
          href="/quiz"
          className="rounded-full bg-[#d9bd93] px-8 py-3 text-sm tracking-wide text-stone-900 transition-colors hover:bg-white"
        >
          Пройти квіз
        </Link>
      </div>
    </section>
  );
}
