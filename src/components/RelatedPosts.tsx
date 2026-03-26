import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { CATEGORIES } from "@/lib/posts";
import { BookOpen, ArrowRight } from "lucide-react";

export default function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-12 border-t border-neutral-200 pt-8">
      <div className="mb-4 flex items-center gap-2">
        <BookOpen className="h-4 w-4 text-neutral-400" />
        <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
          あわせて読みたい
        </h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {posts.map((post) => {
          const catName =
            CATEGORIES.find((c) => c.slug === post.category)?.name ??
            post.category;

          return (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex items-center gap-3 rounded-lg border border-neutral-200 bg-white p-4 transition-all hover:border-neutral-300 hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <BookOpen className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs text-neutral-400">{catName}</span>
                <p className="mt-0.5 text-sm font-medium leading-snug text-neutral-800 group-hover:text-emerald-700">
                  {post.title}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-neutral-300 transition-colors group-hover:text-emerald-600" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
