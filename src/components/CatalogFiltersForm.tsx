import Link from "next/link";
import { FRAGRANCE_TYPE_LABELS, GENDER_LABELS } from "@/lib/labels";
import {
  hasActiveFilters,
  type CatalogFilters,
  type FragranceTypeKey,
  type GenderKey,
} from "@/lib/catalog-filters";

type Props = {
  brands: { id: number; name: string }[];
  filters: CatalogFilters;
};

// Звичайна GET-форма: працює без JS, а фільтри потрапляють в URL.
export default function CatalogFiltersForm({ brands, filters }: Props) {
  const genders = Object.entries(GENDER_LABELS) as [GenderKey, string][];
  const types = Object.entries(FRAGRANCE_TYPE_LABELS) as [FragranceTypeKey, string][];

  return (
    <form action="/catalog" method="get" className="space-y-7">
      {/* сортування зберігається при застосуванні фільтрів */}
      <input type="hidden" name="sort" value={filters.sort} />
      {/* пошуковий запит зберігається при застосуванні фільтрів */}
      {filters.q && <input type="hidden" name="q" value={filters.q} />}

      <Fieldset title="Бренд">
        {brands.map((b) => (
          <Check
            key={b.id}
            name="brand"
            value={String(b.id)}
            label={b.name}
            checked={filters.brandIds.includes(b.id)}
          />
        ))}
      </Fieldset>

      <Fieldset title="Для кого">
        {genders.map(([value, label]) => (
          <Check
            key={value}
            name="gender"
            value={value}
            label={label}
            checked={filters.genders.includes(value)}
          />
        ))}
      </Fieldset>

      <Fieldset title="Тип аромату">
        {types.map(([value, label]) => (
          <Check
            key={value}
            name="type"
            value={value}
            label={label}
            checked={filters.types.includes(value)}
          />
        ))}
      </Fieldset>

      <fieldset>
        <legend className="mb-3 text-xs tracking-widest text-stone-500 uppercase">
          Ціна, ₴
        </legend>
        <div className="flex items-center gap-2">
          <input
            type="number"
            name="minPrice"
            min={0}
            inputMode="numeric"
            placeholder="від"
            aria-label="Мінімальна ціна"
            defaultValue={filters.minPrice}
            className="w-full rounded-full border border-stone-300 px-4 py-2 text-sm text-black focus:border-[#9a7b4f] focus:outline-none"
          />
          <span className="text-stone-400" aria-hidden="true">
            –
          </span>
          <input
            type="number"
            name="maxPrice"
            min={0}
            inputMode="numeric"
            placeholder="до"
            aria-label="Максимальна ціна"
            defaultValue={filters.maxPrice}
            className="w-full rounded-full border border-stone-300 px-4 py-2 text-sm text-black focus:border-[#9a7b4f] focus:outline-none"
          />
        </div>
      </fieldset>

      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 rounded-full bg-stone-900 px-5 py-2.5 text-sm text-white transition-colors hover:bg-[#9a7b4f]"
        >
          Застосувати
        </button>
        {hasActiveFilters(filters) && (
          <Link
            href={filters.sort === "new" ? "/catalog" : `/catalog?sort=${filters.sort}`}
            className="rounded-full border border-stone-300 px-5 py-2.5 text-sm text-stone-700 transition-colors hover:border-stone-900"
          >
            Скинути
          </Link>
        )}
      </div>
    </form>
  );
}

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-3 text-xs tracking-widest text-stone-500 uppercase">
        {title}
      </legend>
      <div className="space-y-2">{children}</div>
    </fieldset>
  );
}

function Check({
  name,
  value,
  label,
  checked,
}: {
  name: string;
  value: string;
  label: string;
  checked: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm text-stone-800">
      <input
        type="checkbox"
        name={name}
        value={value}
        defaultChecked={checked}
        className="h-4 w-4 accent-[#9a7b4f]"
      />
      {label}
    </label>
  );
}
