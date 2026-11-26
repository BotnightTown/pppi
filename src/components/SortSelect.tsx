"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SORT_OPTIONS, type CatalogSort } from "@/lib/catalog-filters";

// Змінює лише параметр sort, решту фільтрів у URL зберігає.
// Використовує useSearchParams, тому має рендеритись усередині <Suspense>.
export default function SortSelect({ value }: { value: CatalogSort }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", e.target.value);
    router.push(`/catalog?${params.toString()}`);
  }

  return (
    <label className="flex items-center gap-2 text-sm text-stone-600">
      <span className="hidden sm:inline">Сортування:</span>
      <select
        value={value}
        onChange={onChange}
        className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm text-black focus:border-[#9a7b4f] focus:outline-none"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
