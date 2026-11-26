import Link from "next/link";

type Props = {
  defaultValue?: string;
  sort?: string; // зберігається, щоб сортування не скидалося пошуком
  className?: string;
};

// Рядок пошуку: звичайна GET-форма на /catalog?q=...
// Без стану й без серверних API, тому його можна підключати де завгодно
// (сторінка каталогу, Header, MobileMenu) — навіть із клієнтського компонента.
export default function SearchBar({ defaultValue = "", sort, className = "" }: Props) {
  return (
    <form
      action="/catalog"
      method="get"
      role="search"
      className={`relative ${className}`}
    >
      {sort && sort !== "new" && <input type="hidden" name="sort" value={sort} />}

      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-stone-400"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>

      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        maxLength={100}
        placeholder="Пошук за назвою або брендом"
        aria-label="Пошук парфумів"
        className="w-full rounded-full border border-stone-300 bg-white py-2.5 pr-24 pl-11 text-sm text-black placeholder:text-stone-400 focus:border-[#9a7b4f] focus:outline-none"
      />

      <div className="absolute top-1/2 right-1.5 flex -translate-y-1/2 items-center gap-1">
        {defaultValue && (
          <Link
            href={sort && sort !== "new" ? `/catalog?sort=${sort}` : "/catalog"}
            aria-label="Очистити пошук"
            className="rounded-full px-2 py-1 text-stone-400 hover:text-stone-800"
          >
            ✕
          </Link>
        )}
        <button
          type="submit"
          className="rounded-full bg-stone-900 px-4 py-1.5 text-xs text-white transition-colors hover:bg-[#9a7b4f]"
        >
          Знайти
        </button>
      </div>
    </form>
  );
}
