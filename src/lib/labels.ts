// Українські підписи для enum-ів Prisma. Використовуються на сторінці товару,
// а далі — у фільтрах каталогу (завдання [7]).

export const GENDER_LABELS = {
  WOMEN: "Жіночі",
  MEN: "Чоловічі",
  UNISEX: "Унісекс",
} as const satisfies Record<"WOMEN" | "MEN" | "UNISEX", string>;

export const FRAGRANCE_TYPE_LABELS = {
  PARFUM: "Парфуми",
  EAU_DE_PARFUM: "Парфумована вода",
  EAU_DE_TOILETTE: "Туалетна вода",
  EAU_DE_COLOGNE: "Одеколон",
} as const satisfies Record<
  "PARFUM" | "EAU_DE_PARFUM" | "EAU_DE_TOILETTE" | "EAU_DE_COLOGNE",
  string
>;
