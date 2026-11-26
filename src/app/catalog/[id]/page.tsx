import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductGallery from "@/components/ProductGallery";
import { getPerfume, type FragranceNotes } from "@/lib/perfume";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const perfume = await getPerfume(id);
  if (!perfume) return { title: "Товар не знайдено — Aura" };

  return {
    title: `${perfume.brand} ${perfume.name} — Aura`,
    description: perfume.description.slice(0, 160),
  };
}

// Оболонка статична; params і запит до БД — всередині Suspense (Cache Components).
export default function ProductPage({ params }: Props) {
  return (
    <main className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<ProductSkeleton />}>
          <ProductDetails params={params} />
        </Suspense>
      </div>
    </main>
  );
}

async function ProductDetails({ params }: Props) {
  const { id } = await params;
  const p = await getPerfume(id);
  if (!p) notFound();

  const noteGroups: { key: keyof FragranceNotes; title: string }[] = [
    { key: "top", title: "Верхні ноти" },
    { key: "heart", title: "Ноти серця" },
    { key: "base", title: "Базові ноти" },
  ];
  const hasNotes = noteGroups.some((g) => p.notes[g.key].length > 0);

  return (
    <>
      <nav aria-label="Навігація" className="mb-6 text-sm text-stone-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-[#9a7b4f]">
              Головна
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/catalog" className="hover:text-[#9a7b4f]">
              Каталог
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-stone-800">
            {p.name}
          </li>
        </ol>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={p.images} alt={`${p.brand} ${p.name}`} />

        <div className="flex flex-col">
          <p className="text-xs tracking-widest text-stone-500 uppercase">
            {p.brand}
          </p>
          <h1 className="mt-2 font-serif text-4xl leading-tight text-black">
            {p.name}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-3xl font-medium text-black">
              {p.price.toLocaleString("uk-UA")} ₴
            </span>
            {p.inStock ? (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs text-emerald-800">
                В наявності
              </span>
            ) : (
              <span className="rounded-full bg-stone-900 px-3 py-1 text-xs text-white">
                Немає в наявності
              </span>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-stone-700">{p.description}</p>

          <dl className="mt-8 grid grid-cols-3 gap-4 border-y border-stone-200 py-5 text-sm">
            <div>
              <dt className="text-stone-500">Об&apos;єм</dt>
              <dd className="mt-1 text-black">{p.volume} мл</dd>
            </div>
            <div>
              <dt className="text-stone-500">Для кого</dt>
              <dd className="mt-1 text-black">{p.gender}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Тип</dt>
              <dd className="mt-1 text-black">{p.fragranceType}</dd>
            </div>
          </dl>

          {hasNotes && (
            <section className="mt-8" aria-labelledby="notes-title">
              <h2 id="notes-title" className="font-serif text-xl text-black">
                Піраміда аромату
              </h2>
              <div className="mt-4 space-y-4">
                {noteGroups.map(
                  ({ key, title }) =>
                    p.notes[key].length > 0 && (
                      <div key={key}>
                        <h3 className="text-xs tracking-widest text-stone-500 uppercase">
                          {title}
                        </h3>
                        <ul className="mt-2 flex flex-wrap gap-2">
                          {p.notes[key].map((note) => (
                            <li
                              key={note}
                              className="rounded-full bg-[#f1e8da] px-3 py-1 text-sm text-stone-800"
                            >
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ),
                )}
              </div>
            </section>
          )}

          {/* Кошик і обране з'являться в завданнях [9] та [14] */}
          <div className="mt-10 flex gap-3">
            <button
              type="button"
              disabled={!p.inStock}
              className="flex-1 rounded-full bg-stone-900 px-6 py-3 text-sm text-white transition-colors hover:bg-[#9a7b4f] disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-500"
            >
              {p.inStock ? "В кошик" : "Немає в наявності"}
            </button>
            <button
              type="button"
              aria-label="Додати в обране"
              className="rounded-full border border-stone-300 p-3 text-stone-700 transition-colors hover:border-rose-300 hover:text-rose-600"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />
              </svg>
            </button>
          </div>

          {p.brandDescription && (
            <section className="mt-10 rounded-2xl bg-stone-50 p-5">
              <h2 className="text-xs tracking-widest text-stone-500 uppercase">
                Про бренд {p.brand}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-700">
                {p.brandDescription}
              </p>
            </section>
          )}
        </div>
      </div>
    </>
  );
}

function ProductSkeleton() {
  return (
    <div
      className="grid animate-pulse gap-10 lg:grid-cols-2 lg:gap-16"
      aria-busy="true"
      aria-label="Завантаження товару"
    >
      <div className="aspect-3/4 rounded-2xl bg-stone-100" />
      <div className="space-y-4">
        <div className="h-3 w-1/4 rounded bg-stone-100" />
        <div className="h-10 w-2/3 rounded bg-stone-100" />
        <div className="h-8 w-1/3 rounded bg-stone-100" />
        <div className="h-24 w-full rounded bg-stone-100" />
        <div className="h-16 w-full rounded bg-stone-100" />
      </div>
    </div>
  );
}
