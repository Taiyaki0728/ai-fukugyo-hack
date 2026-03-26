import Link from "next/link";
import { CATEGORIES } from "@/lib/posts";

export default function CategoryNav({ active }: { active?: string }) {
  return (
    <nav aria-label="カテゴリナビゲーション" className="flex flex-wrap gap-2">
      <Link
        href="/"
        className={`rounded-full px-3 py-1 text-sm transition-colors ${
          !active
            ? "bg-emerald-700 text-white"
            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
        }`}
      >
        すべて
      </Link>
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.slug}
          href={`/category/${cat.slug}`}
          className={`rounded-full px-3 py-1 text-sm transition-colors ${
            active === cat.slug
              ? "bg-emerald-700 text-white"
              : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
          }`}
        >
          {cat.name}
        </Link>
      ))}
    </nav>
  );
}
