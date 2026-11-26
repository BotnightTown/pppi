// Запуск: npx tsx --env-file=.env prisma/seed.ts
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

const brands = [
  { name: "Maison Lumière", description: "Паризький дім класичної парфумерії." },
  { name: "Atelier Rose", description: "Квіткові та амброві композиції ручної роботи." },
  { name: "Nord & Co", description: "Скандинавська мінімалістична парфумерія." },
];

type Seed = {
  name: string;
  brand: string;
  description: string;
  notes: { top: string[]; heart: string[]; base: string[] };
  volume: number;
  gender: "WOMEN" | "MEN" | "UNISEX";
  type: "PARFUM" | "EAU_DE_PARFUM" | "EAU_DE_TOILETTE" | "EAU_DE_COLOGNE";
  price: number;
  inStock?: boolean;
};

const SLUGS: Record<string, string> = {
  "Noir Velours": "noir-velours",
  "Ambre Doré": "ambre-dore",
  "Bois Sauvage": "bois-sauvage",
  "Fleur de Soie": "fleur-de-soie",
  "Cuir Fumé": "cuir-fume",
  "Aube Blanche": "aube-blanche",
  "Rose Éternelle": "rose-eternelle",
  "Minuit Épicé": "minuit-epice",
  "Brise Nordique": "brise-nordique",
  "Jardin Secret": "jardin-secret",
  "Santal Poudré": "santal-poudre",
  Fjord: "fjord",
};
// файли лежать у public/perfumes/<slug>.jpg
const imageFor = (name: string) => [`/perfumes/${SLUGS[name]}.jpg`];

const perfumes: Seed[] = [
  { name: "Noir Velours", brand: "Maison Lumière", description: "Оксамитовий вечірній аромат із димним шлейфом.", notes: { top: ["бергамот", "рожевий перець"], heart: ["ірис", "жасмин"], base: ["ваніль", "пачулі"] }, volume: 50, gender: "UNISEX", type: "EAU_DE_PARFUM", price: 3450 },
  { name: "Ambre Doré", brand: "Atelier Rose", description: "Тепла амбра з медовими акордами.", notes: { top: ["мандарин"], heart: ["амбра", "троянда"], base: ["мускус", "бурбонська ваніль"] }, volume: 100, gender: "WOMEN", type: "PARFUM", price: 4200 },
  { name: "Bois Sauvage", brand: "Nord & Co", description: "Свіжий лісовий аромат із нотами кедра.", notes: { top: ["ялівець"], heart: ["кедр", "шавлія"], base: ["дубовий мох"] }, volume: 75, gender: "MEN", type: "EAU_DE_TOILETTE", price: 2890, inStock: false },
  { name: "Fleur de Soie", brand: "Maison Lumière", description: "Ніжний пудровий квітковий букет.", notes: { top: ["груша"], heart: ["півонія", "конвалія"], base: ["білий мускус"] }, volume: 50, gender: "WOMEN", type: "EAU_DE_PARFUM", price: 3120 },
  { name: "Cuir Fumé", brand: "Atelier Rose", description: "Шкіра, тютюн і спеції.", notes: { top: ["кардамон"], heart: ["шкіра", "тютюн"], base: ["амбра", "боби тонка"] }, volume: 100, gender: "MEN", type: "PARFUM", price: 4650 },
  { name: "Aube Blanche", brand: "Nord & Co", description: "Прозорий аромат світанку: чай і білий кедр.", notes: { top: ["білий чай"], heart: ["лаванда"], base: ["білий кедр", "мускус"] }, volume: 50, gender: "UNISEX", type: "EAU_DE_COLOGNE", price: 2350 },
  { name: "Rose Éternelle", brand: "Atelier Rose", description: "Багатогранна троянда з ноткою ладану.", notes: { top: ["лічі"], heart: ["дамаська троянда"], base: ["ладан", "сандал"] }, volume: 50, gender: "WOMEN", type: "EAU_DE_PARFUM", price: 3780 },
  { name: "Minuit Épicé", brand: "Maison Lumière", description: "Східні спеції та темна ваніль.", notes: { top: ["шафран"], heart: ["кориця", "оуд"], base: ["ваніль", "сандал"] }, volume: 75, gender: "UNISEX", type: "PARFUM", price: 5100 },
  { name: "Brise Nordique", brand: "Nord & Co", description: "Морська свіжість і мінеральні ноти.", notes: { top: ["морська сіль", "лимон"], heart: ["водні квіти"], base: ["амбрет"] }, volume: 100, gender: "MEN", type: "EAU_DE_TOILETTE", price: 2640 },
  { name: "Jardin Secret", brand: "Atelier Rose", description: "Зелений сад після дощу.", notes: { top: ["зелені листя"], heart: ["фіалка", "гарденія"], base: ["ветивер"] }, volume: 50, gender: "WOMEN", type: "EAU_DE_TOILETTE", price: 2790 },
  { name: "Santal Poudré", brand: "Maison Lumière", description: "Пудровий сандал із кремовим серцем.", notes: { top: ["ірис"], heart: ["сандал"], base: ["кашемір", "мускус"] }, volume: 100, gender: "UNISEX", type: "EAU_DE_PARFUM", price: 4380 },
  { name: "Fjord", brand: "Nord & Co", description: "Холодні хвойні ноти та мінімалізм.", notes: { top: ["ялина"], heart: ["ладанник"], base: ["ветивер", "амбра"] }, volume: 50, gender: "UNISEX", type: "EAU_DE_COLOGNE", price: 2210 },
];

async function main() {
  const brandIds = new Map<string, number>();
  for (const b of brands) {
    const row = await prisma.brand.upsert({
      where: { name: b.name },
      update: {},
      create: b,
    });
    brandIds.set(b.name, row.id);
  }

  let created = 0;
  let updated = 0;
  for (const p of perfumes) {
    const existing = await prisma.perfume.findFirst({ where: { name: p.name } });
    if (existing) {
      // вже є в БД — лише підставляємо зображення
      await prisma.perfume.update({
        where: { id: existing.id },
        data: { images: imageFor(p.name) },
      });
      updated++;
      continue;
    }
    await prisma.perfume.create({
      data: {
        name: p.name,
        brandId: brandIds.get(p.brand)!,
        description: p.description,
        fragranceNotes: p.notes,
        volume: p.volume,
        gender: p.gender,
        fragranceType: p.type,
        price: p.price,
        stockStatus: p.inStock === false ? "OUT_OF_STOCK" : "IN_STOCK",
        images: imageFor(p.name),
      },
    });
    created++;
  }

  console.log(`Створено: ${created}, оновлено зображення: ${updated}.`);
}

main().finally(() => prisma.$disconnect());
