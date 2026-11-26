import Image from "next/image";
import Link from "next/link";

export type ProductCardData = {
  id: number;
  name: string;
  brand: string;
  price: number;
  volume: number;
  inStock: boolean;
  image?: string | null; // перше зображення з Perfume.images
};

export default function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-3/4 overflow-hidden rounded-2xl bg-linear-to-b from-[#f1e8da] to-[#e3d2b6]">
        <Link
          href={`/catalog/${product.id}`}
          aria-label={product.name}
          className="absolute inset-0 flex items-center justify-center text-black"
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={`${product.brand} ${product.name}`}
              fill
              unoptimized
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex h-1/2 w-1/3 flex-col items-center transition-transform group-hover:scale-105"
            >
              <span className="h-3 w-5 rounded-t bg-[#9a7b4f]" />
              <span className="h-2 w-8 bg-[#7d6240]" />
              <span className="w-full flex-1 rounded-xl border border-white/70 bg-white/60 shadow-md" />
            </span>
          )}
        </Link>

        <button
          type="button"
          aria-label="Додати в обране"
          className="absolute top-3 right-3 rounded-full bg-white/80 p-2 text-stone-700 transition-colors hover:text-rose-600"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z" />
          </svg>
        </button>

        {!product.inStock && (
          <span className="absolute top-3 left-3 rounded-full bg-stone-900 px-3 py-1 text-[11px] text-white">
            Немає в наявності
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-xs tracking-widest text-stone-500 uppercase">
          {product.brand}
        </p>
        <h3 className="mt-1 font-serif text-lg leading-snug text-black">
          <Link
            href={`/catalog/${product.id}`}
            className="hover:text-[#9a7b4f]"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-stone-500">{product.volume} мл</p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-base font-medium text-black">
            {product.price.toLocaleString("uk-UA")} ₴
          </span>
          <button
            type="button"
            disabled={!product.inStock}
            className="rounded-full border border-stone-900 px-4 py-1.5 text-xs transition-colors hover:bg-stone-900 hover:text-white disabled:cursor-not-allowed disabled:border-stone-300 disabled:text-stone-400 disabled:hover:bg-transparent text-black"
          >
            В кошик
          </button>
        </div>
      </div>
    </article>
  );
}
