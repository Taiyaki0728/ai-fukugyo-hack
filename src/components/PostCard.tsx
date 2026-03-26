import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { CATEGORIES } from "@/lib/posts";
import { Calendar, Clock, RefreshCw, ArrowUpRight } from "lucide-react";

/**
 * 記事カード
 * 視線の流れ: カテゴリラベル（何の話か）→ タイトル（主役）→ 概要 → 日付・読了時間（補助）
 */
export default function PostCard({ post }: { post: PostMeta }) {
  const categoryName =
    CATEGORIES.find((c) => c.slug === post.category)?.name ?? post.category;

  return (
    <article className="group relative rounded-lg border border-neutral-200 bg-white p-5 transition-all hover:shadow-md hover:border-neutral-300">
      {/* Top row: category + arrow indicator */}
      <div className="flex items-start justify-between">
        <span className="inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
          {categoryName}
        </span>
        <ArrowUpRight className="h-4 w-4 text-neutral-300 transition-colors group-hover:text-emerald-600" />
      </div>

      {/* Title — the hero of the card */}
      <h2 className="mt-2.5 text-lg font-bold leading-snug text-neutral-900 group-hover:text-emerald-700">
        <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h2>

      {/* Description — supports scanning */}
      {post.description && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">
          {post.description}
        </p>
      )}

      {/* Meta — least important, bottom row */}
      <div className="mt-4 flex items-center gap-4 border-t border-neutral-100 pt-3 text-xs text-neutral-400">
        <span className="flex items-center gap-1">
          <Calendar className="h-3.5 w-3.5" />
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("ja-JP", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </time>
        </span>
        {post.updatedAt && (
          <span className="flex items-center gap-1 text-amber-600">
            <RefreshCw className="h-3 w-3" />
            {new Date(post.updatedAt).toLocaleDateString("ja-JP", {
              month: "short",
              day: "numeric",
            })}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" />
          {post.readingTime}
        </span>
      </div>
    </article>
  );
}
