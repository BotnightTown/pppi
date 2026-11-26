import Link from "next/link";

const categories = [
  {
    title: "Жіночі",
    href: "/catalog?gender=women",
    gradient: "from-rose-200 to-amber-100",
  },
  {
    title: "Чоловічі",
    href: "/catalog?gender=men",
    gradient: "from-stone-300 to-slate-200",
  },
  {
    title: "Унісекс",
    href: "/catalog?gender=unisex",
    gradient: "from-amber-200 to-emerald-100",
  },
];

export default function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="mb-8 text-center font-[family-name:var(--font-serif)] text-3xl">
        Обирайте за напрямком
      </h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.title}
            href={c.href}
            className={`group flex h-44 items-end rounded-2xl bg-gradient-to-br ${c.gradient} p-6 transition-transform hover:-translate-y-1`}
          >
            <span className="flex w-full items-center justify-between font-[family-name:var(--font-serif)] text-2xl text-black">
              {c.title}
              <span className="text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
