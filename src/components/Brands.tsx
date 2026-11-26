import Link from "next/link";

const brands = [
  "Maison Lumière",
  "Atelier Rose",
  "Nord & Co",
  "Oud Royale",
  "Silk Road",
  "Verde Studio",
];

export default function Brands() {
  return (
    <section className="border-y border-stone-200 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-center text-xs tracking-[0.3em] text-stone-500 uppercase">
          Наші бренди
        </h2>
        <ul className="grid grid-cols-2 gap-4 text-center sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((b) => (
            <li key={b}>
              <Link
                href={`/catalog?brand=${encodeURIComponent(b)}`}
                className="block font-[family-name:var(--font-serif)] text-lg text-stone-600 transition-colors hover:text-[#9a7b4f]"
              >
                {b}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
