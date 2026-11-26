import Link from "next/link";
import { Suspense } from "react";
import ProductCard from "./ProductCard";
import { getFeaturedPerfumes } from "@/lib/catalog";

const GRID = "grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6";

export default function FeaturedProducts() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-[family-name:var(--font-serif)] text-3xl text-black">
            Популярне зараз
          </h2>
          <Link
            href="/catalog"
            className="text-sm text-stone-600 underline-offset-4 hover:text-[#9a7b4f] hover:underline"
          >
            Дивитися все
          </Link>
        </div>

        {/* Запит до БД — у Suspense (Cache Components), тому app/page.tsx змінювати не треба */}
        <Suspense fallback={<FeaturedSkeleton />}>
          <FeaturedGrid />
        </Suspense>
      </div>
    </section>
  );
}

async function FeaturedGrid() {
  const products = await getFeaturedPerfumes(4);

  if (products.length === 0) {
    return (
      <p className="py-10 text-center text-stone-500">
        Товари скоро з&apos;являться.
      </p>
    );
  }

  return (
    <div className={GRID}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

function FeaturedSkeleton() {
  return (
    <div className={`${GRID} animate-pulse`} aria-busy="true" aria-label="Завантаження">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i}>
          <div className="aspect-3/4 rounded-2xl bg-stone-100" />
          <div className="mt-4 h-3 w-1/3 rounded bg-stone-100" />
          <div className="mt-2 h-5 w-2/3 rounded bg-stone-100" />
          <div className="mt-4 h-8 w-full rounded-full bg-stone-100" />
        </div>
      ))}
    </div>
  );
}
