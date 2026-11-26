"use client";

import { useState } from "react";

// Обгортка для форми фільтрів: на мобільному згортається за кнопкою, на lg — завжди видима.
export default function FiltersPanel({
  defaultOpen,
  children,
}: {
  defaultOpen: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="catalog-filters"
        className="mb-4 flex w-full items-center justify-between rounded-full border border-stone-300 px-5 py-2.5 text-sm text-black lg:hidden"
      >
        <span>Фільтри</span>
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <div id="catalog-filters" className={`${open ? "block" : "hidden"} lg:block`}>
        {children}
      </div>
    </div>
  );
}
