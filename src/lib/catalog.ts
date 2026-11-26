import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";
import type { ProductCardData } from "@/components/ProductCard";
import {
  searchTerms,
  type CatalogFilters,
  type CatalogSort,
} from "@/lib/catalog-filters";

const cardSelect = {
  id: true,
  name: true,
  price: true,
  volume: true,
  stockStatus: true,
  images: true,
  brand: { select: { name: true } },
} satisfies Prisma.PerfumeSelect;

type CardRow = Prisma.PerfumeGetPayload<{ select: typeof cardSelect }>;

function toCard(p: CardRow): ProductCardData {
  return {
    id: p.id,
    name: p.name,
    brand: p.brand.name,
    price: p.price.toNumber(), // Decimal -> number для передачі в компонент
    volume: p.volume,
    inStock: p.stockStatus === "IN_STOCK",
    image: p.images[0] ?? null,
  };
}

const ORDER_BY: Record<CatalogSort, Prisma.PerfumeOrderByWithRelationInput[]> = {
  new: [{ createdAt: "desc" }, { id: "desc" }],
  price_asc: [{ price: "asc" }, { id: "asc" }],
  price_desc: [{ price: "desc" }, { id: "desc" }],
  name_asc: [{ name: "asc" }, { id: "asc" }],
};

// Завдання [5] + [7]: перелік парфумів із фільтрами та сортуванням.
// Всередині групи (кілька брендів/типів) умови поєднуються через OR, між групами — через AND.
export async function getCatalogPerfumes(
  filters: CatalogFilters,
): Promise<ProductCardData[]> {
  const where: Prisma.PerfumeWhereInput = {};

  // Пошук: кожне слово запиту має входити в назву парфуму АБО в назву бренду
  // (без урахування регістру). Prisma екранує % та _ у contains.
  const terms = searchTerms(filters.q);
  if (terms.length) {
    where.AND = terms.map((term) => ({
      OR: [
        { name: { contains: term, mode: "insensitive" } },
        { brand: { name: { contains: term, mode: "insensitive" } } },
      ],
    }));
  }

  if (filters.brandIds.length) where.brandId = { in: filters.brandIds };
  if (filters.genders.length) where.gender = { in: filters.genders };
  if (filters.types.length) where.fragranceType = { in: filters.types };

  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    where.price = {
      ...(filters.minPrice !== undefined && { gte: filters.minPrice }),
      ...(filters.maxPrice !== undefined && { lte: filters.maxPrice }),
    };
  }

  const perfumes = await prisma.perfume.findMany({
    where,
    orderBy: ORDER_BY[filters.sort],
    select: cardSelect,
  });

  return perfumes.map(toCard);
}

// Бренди для блоку фільтрів (лише ті, що мають товари)
export async function getBrandsForFilter() {
  return prisma.brand.findMany({
    where: { perfumes: { some: {} } },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });
}

// Головна сторінка: «Популярне зараз» — найчастіше замовлювані, далі найновіші
export async function getFeaturedPerfumes(limit = 4): Promise<ProductCardData[]> {
  const perfumes = await prisma.perfume.findMany({
    orderBy: [{ orderItems: { _count: "desc" } }, { createdAt: "desc" }, { id: "desc" }],
    take: limit,
    select: cardSelect,
  });
  return perfumes.map(toCard);
}
