import Link from "next/link";

const columns = [
  {
    title: "Магазин",
    links: [
      { href: "/catalog", label: "Каталог" },
      { href: "/quiz", label: "Підбір аромату" },
      { href: "/favorites", label: "Обране" },
      { href: "/cart", label: "Кошик" },
    ],
  },
  {
    title: "Інформація",
    links: [
      { href: "/delivery", label: "Доставка й оплата" },
      { href: "/returns", label: "Повернення" },
      { href: "/about", label: "Про нас" },
      { href: "/contacts", label: "Контакти" },
    ],
  },
  {
    title: "Акаунт",
    links: [
      { href: "/login", label: "Вхід" },
      { href: "/register", label: "Реєстрація" },
      { href: "/profile", label: "Мої замовлення" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <Link
            href="/"
            className="font-[family-name:var(--font-serif)] text-2xl tracking-[0.2em] text-white uppercase"
          >
            Aura
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-400">
            Інтернет-магазин оригінальної парфумерії з доставкою по всій
            Україні.
          </p>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="mb-4 text-xs tracking-[0.25em] text-white uppercase">
              {col.title}
            </h3>
            <ul className="space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-[#d9bd93]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-stone-800 px-4 py-5 text-center text-xs text-stone-500">
        © 2026 Aura. Навчальний проєкт.
      </div>
    </footer>
  );
}
