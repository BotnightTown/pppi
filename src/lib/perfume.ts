import { cache } from "react";
import { prisma } from "@/lib/prisma";
import { FRAGRANCE_TYPE_LABELS, GENDER_LABELS } from "@/lib/labels";

export type FragranceNotes = {
  top: string[];
  heart: string[];
  base: string[];
};

export type PerfumeDetails = {
  id: number;
  name: string;
  brand: string;
  brandDescription: string | null;
  description: string;
  notes: FragranceNotes;
  volume: number;
  gender: string;
  fragranceType: string;
  price: number;
  inStock: boolean;
  images: string[];
};

function toStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((v): v is string => typeof v === "string")
    : [];
}

// У БД ноти зберігаються як Json: { top: [], heart: [], base: [] }
function parseNotes(json: unknown): FragranceNotes {
  const obj =
    json && typeof json === "object" && !Array.isArray(json)
      ? (json as Record<string, unknown>)
      : {};
  return {
    top: toStringArray(obj.top),
    heart: toStringArray(obj.heart),
    base: toStringArray(obj.base),
  };
}

// React cache: generateMetadata і сторінка роблять один запит до БД на рендер.
export const getPerfume = cache(
  async (idParam: string): Promise<PerfumeDetails | null> => {
    if (!/^\d+$/.test(idParam)) return null;
    const id = Number(idParam);
    if (!Number.isSafeInteger(id) || id > 2_147_483_647) return null; // Int у PostgreSQL

    const p = await prisma.perfume.findUnique({
      where: { id },
      include: { brand: { select: { name: true, description: true } } },
    });
    if (!p) return null;

    return {
      id: p.id,
      name: p.name,
      brand: p.brand.name,
      brandDescription: p.brand.description,
      description: p.description,
      notes: parseNotes(p.fragranceNotes),
      volume: p.volume,
      gender: GENDER_LABELS[p.gender],
      fragranceType: FRAGRANCE_TYPE_LABELS[p.fragranceType],
      price: p.price.toNumber(),
      inStock: p.stockStatus === "IN_STOCK",
      images: p.images,
    };
  },
);
