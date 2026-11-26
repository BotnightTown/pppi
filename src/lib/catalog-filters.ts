import { FRAGRANCE_TYPE_LABELS, GENDER_LABELS } from "@/lib/labels";

// Параметри каталогу живуть в URL: /catalog?brand=1&brand=3&gender=WOMEN&minPrice=2000&sort=price_asc
// Це дає посилання, які можна зберегти/надіслати, та роботу кнопки «Назад».

export const SORT_OPTIONS = [
  { value: "new", label: "Спочатку нові" },
  { value: "price_asc", label: "Ціна: від найменшої" },
  { value: "price_desc", label: "Ціна: від найбільшої" },
  { value: "name_asc", label: "За назвою А–Я" },
] as const;

export type CatalogSort = (typeof SORT_OPTIONS)[number]["value"];
export type GenderKey = keyof typeof GENDER_LABELS;
export type FragranceTypeKey = keyof typeof FRAGRANCE_TYPE_LABELS;

export type CatalogFilters = {
  q: string; // пошуковий запит (назва парфуму або бренд); "" — пошуку немає
  brandIds: number[];
  genders: GenderKey[];
  types: FragranceTypeKey[];
  minPrice?: number;
  maxPrice?: number;
  sort: CatalogSort;
};

export type RawSearchParams = Record<string, string | string[] | undefined>;

const MAX_INT = 2_147_483_647; // Int у PostgreSQL
const MAX_PRICE = 99_999_999; // Decimal(10, 2)

function list(value: string | string[] | undefined): string[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

const MAX_QUERY_LENGTH = 100;

// Обрізає, стискає пробіли, обмежує довжину
function parseQuery(value: string | string[] | undefined): string {
  const raw = list(value)[0] ?? "";
  return raw.replace(/\s+/g, " ").trim().slice(0, MAX_QUERY_LENGTH).trim();
}

// "maison noir" -> ["maison", "noir"]: кожне слово має знайтися в назві або бренді
export function searchTerms(q: string): string[] {
  return q.split(" ").filter(Boolean);
}

function parsePrice(value: string | string[] | undefined): number | undefined {
  const raw = list(value)[0]?.trim();
  if (!raw) return undefined;
  const n = Number(raw.replace(",", "."));
  if (!Number.isFinite(n) || n < 0) return undefined;
  return Math.min(n, MAX_PRICE);
}

function pickKeys<K extends string>(
  values: string[],
  allowed: Record<K, string>,
): K[] {
  const result = values.filter((v): v is K => Object.hasOwn(allowed, v));
  return [...new Set(result)];
}

export function parseCatalogParams(raw: RawSearchParams): CatalogFilters {
  const brandIds = [
    ...new Set(
      list(raw.brand)
        .map(Number)
        .filter((n) => Number.isInteger(n) && n > 0 && n <= MAX_INT),
    ),
  ];

  let minPrice = parsePrice(raw.minPrice);
  let maxPrice = parsePrice(raw.maxPrice);
  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    [minPrice, maxPrice] = [maxPrice, minPrice];
  }

  const sortRaw = list(raw.sort)[0];
  const sort =
    SORT_OPTIONS.find((o) => o.value === sortRaw)?.value ?? "new";

  return {
    q: parseQuery(raw.q),
    brandIds,
    genders: pickKeys(list(raw.gender), GENDER_LABELS),
    types: pickKeys(list(raw.type), FRAGRANCE_TYPE_LABELS),
    minPrice,
    maxPrice,
    sort,
  };
}

// Сортування не вважається фільтром; пошук — вважається
export function hasActiveFilters(f: CatalogFilters): boolean {
  return (
    f.q !== "" ||
    f.brandIds.length > 0 ||
    f.genders.length > 0 ||
    f.types.length > 0 ||
    f.minPrice !== undefined ||
    f.maxPrice !== undefined
  );
}
