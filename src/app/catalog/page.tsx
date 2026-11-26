import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import CatalogFiltersForm from "@/components/CatalogFiltersForm";
import FiltersPanel from "@/components/FiltersPanel";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import SortSelect from "@/components/SortSelect";
import { getBrandsForFilter, getCatalogPerfumes } from "@/lib/catalog";
import {
  hasActiveFilters,
  parseCatalogParams,
  type RawSearchParams,
} from "@/lib/catalog-filters";

export const metadata: Metadata = {
  title: "Каталог парфумів — Aura",
  description: "Каталог парфумів Aura: нішеві та класичні аромати для неї та для нього.",
};

type Props = { searchParams: Promise<RawSearchParams> };

export default function CatalogPage({ searchParams }: Props) {
  return (
    <main className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h1 className="font-serif text-4xl text-black">Каталог</h1>
          <p className="mt-2 text-stone-600">
            Оберіть аромат, який розкаже вашу історію.
          </p>
        </header>

        {/* searchParams і запити до БД — тільки всередині Suspense (Cache Components) */}
        <Suspense fallback={<CatalogSkeleton />}>
          <CatalogContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

async function CatalogContent({ searchParams }: Props) {
  const filters = parseCatalogParams(await searchParams);
  const [brands, products] = await Promise.all([
    getBrandsForFilter(),
    getCatalogPerfumes(filters),
  ]);
  const active = hasActiveFilters(filters);

  return (
    <>
    {/* key скидає введений текст при переході за посиланням (очищення пошуку) */}
    <SearchBar
      key={filters.q}
      defaultValue={filters.q}
      sort={filters.sort}
      className="mb-8 max-w-xl"
    />

    <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:gap-10">
      <aside className="mb-8 lg:mb-0">
        <FiltersPanel defaultOpen={active}>
          {/* key скидає стан чекбоксів при зміні фільтрів через посилання «Скинути» */}
          <CatalogFiltersForm
            key={JSON.stringify(filters)}
            brands={brands}
            filters={filters}
          />
        </FiltersPanel>
      </aside>

      <section aria-label="Результати">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-stone-500">
            {filters.q ? (
              <>
                За запитом «<span className="text-stone-800">{filters.q}</span>»
                знайдено: {products.length}
              </>
            ) : (
              <>Знайдено: {products.length}</>
            )}
          </p>
          <SortSelect value={filters.sort} />
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-stone-600">
              {filters.q
                ? `За запитом «${filters.q}» нічого не знайдено. Перевірте написання або спробуйте коротший запит.`
                : active
                  ? "За обраними фільтрами нічого не знайдено."
                  : "Наразі в каталозі немає товарів."}
            </p>
            {active && (
              <Link
                href="/catalog"
                className="mt-4 inline-block text-sm text-[#9a7b4f] underline underline-offset-4"
              >
                {filters.q ? "Скинути пошук і фільтри" : "Скинути фільтри"}
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-3 lg:gap-x-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
    </>
  );
}

function CatalogSkeleton() {
  return (
    <div
      className="grid animate-pulse grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6"
      aria-busy="true"
      aria-label="Завантаження каталогу"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i}>
          <div className="aspect-3/4 rounded-2xl bg-stone-100" />
          <div className="mt-4 h-3 w-1/3 rounded bg-stone-100" />
          <div className="mt-2 h-5 w-2/3 rounded bg-stone-100" />
          <div className="mt-2 h-3 w-1/4 rounded bg-stone-100" />
          <div className="mt-4 h-8 w-full rounded-full bg-stone-100" />
        </div>
      ))}
    </div>
  );
}
