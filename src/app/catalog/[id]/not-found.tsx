import Link from "next/link";

export default function ProductNotFound() {
  return (
    <main className="bg-white py-24">
      <div className="mx-auto max-w-xl px-4 text-center">
        <h1 className="font-serif text-4xl text-black">Товар не знайдено</h1>
        <p className="mt-3 text-stone-600">
          Можливо, аромат більше не доступний або посилання вказано неправильно.
        </p>
        <Link
          href="/catalog"
          className="mt-8 inline-block rounded-full bg-stone-900 px-6 py-3 text-sm text-white transition-colors hover:bg-[#9a7b4f]"
        >
          Повернутися до каталогу
        </Link>
      </div>
    </main>
  );
}
