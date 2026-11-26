"use client";

import Link from "next/link";
import { useState } from "react";

type MobileMenuProps = {
  links: { href: string; label: string }[];
};

export default function MobileMenu({ links }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Закрити меню" : "Відкрити меню"}
        aria-expanded={open}
        className="rounded-full p-2 text-stone-700 hover:bg-stone-200"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <path d="M6 6l12 12M18 6 6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full border-b border-stone-200 bg-[#faf7f2] shadow-lg">
          <form action="/catalog" role="search" className="px-4 pt-4">
            <input
              type="search"
              name="q"
              placeholder="Пошук аромату або бренду"
              aria-label="Пошук"
              className="w-full rounded-full border border-stone-300 bg-white px-4 py-2 text-sm outline-none"
            />
          </form>
          <nav className="flex flex-col px-4 py-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-stone-200 py-3 text-base text-stone-800 last:border-b-0"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
