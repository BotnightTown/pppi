import Link from "next/link";
import MobileMenu from "./MobileMenu";

export const navLinks = [
  { href: "/catalog", label: "Каталог" },
  { href: "/catalog?gender=women", label: "Жіночі" },
  { href: "/catalog?gender=men", label: "Чоловічі" },
  { href: "/catalog?gender=unisex", label: "Унісекс" },
  { href: "/quiz", label: "Підбір аромату" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-[#faf7f2]/90 backdrop-blur">
      <div className="bg-stone-900 px-4 py-2 text-center text-xs tracking-wide text-stone-100">
        Безкоштовна доставка від 2000 ₴ · Тільки оригінальна продукція
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 lg:hidden">
          <MobileMenu links={navLinks} />
        </div>

        <Link
          href="/"
          className="font-serif text-2xl tracking-[0.2em] uppercase text-black"
        >
          Aura
        </Link>

        <nav className="hidden items-center gap-8 text-sm lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-stone-700 transition-colors hover:text-[#9a7b4f]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <form
            action="/catalog"
            className="hidden items-center rounded-full border border-stone-300 bg-white px-3 py-1.5 md:flex"
            role="search"
          >
            <input
              type="search"
              name="q"
              placeholder="Пошук аромату або бренду"
              aria-label="Пошук"
              className="w-48 bg-transparent text-sm outline-none placeholder:text-stone-400"
            />
            <button
              type="submit"
              aria-label="Шукати"
              className="text-stone-500"
            >
              <SearchIcon />
            </button>
          </form>

          <Link
            href="/favorites"
            aria-label="Обране"
            className="rounded-full p-2 text-stone-700 transition-colors hover:bg-stone-200"
          >
            <HeartIcon />
          </Link>
          <Link
            href="/profile"
            aria-label="Акаунт"
            className="rounded-full p-2 text-stone-700 transition-colors hover:bg-stone-200"
          >
            <UserIcon />
          </Link>
          <Link
            href="/cart"
            aria-label="Кошик"
            className="relative rounded-full p-2 text-stone-700 transition-colors hover:bg-stone-200"
          >
            <BagIcon />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#9a7b4f] px-1 text-[10px] font-medium text-white">
              0
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function SearchIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function HeartIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg {...iconProps}>
      <path d="M5 8h14l-1 12H6L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
