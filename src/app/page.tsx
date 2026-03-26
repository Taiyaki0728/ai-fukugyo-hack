import { getAllPosts } from "@/lib/posts";
import PostCard from "@/components/PostCard";
import CategoryNav from "@/components/CategoryNav";
import Link from "next/link";
import { ArrowRight, Star, Sparkles, TrendingUp } from "lucide-react";

export default function Home() {
  const posts = getAllPosts();
  const featured = posts.filter((p) => p.featured);
  const recent = posts.slice(0, 12);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {/* Hero — clear value proposition, single CTA */}
      <section className="mb-14 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-white p-8 ring-1 ring-emerald-100 sm:p-10">
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-700">
          <Sparkles className="h-4 w-4" />
          2026年最新のAI副業ガイド
        </div>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-4xl">
          AIを味方にして、
          <br />
          <span className="text-emerald-700">副業で稼ぐ力</span>を手に入れる。
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-500">
          ChatGPT・Claude・画像生成AIなどを活用した副業の始め方を、
          初心者にもわかるステップで解説します。
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/category/roadmap"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
          >
            まずはロードマップを見る
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/category/tool-review"
            className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
          >
            AIツール比較を見る
          </Link>
        </div>

        {/* Value props — what the reader gets */}
        <div className="mt-8 grid grid-cols-3 gap-4 border-t border-emerald-100 pt-6">
          <div>
            <p className="text-2xl font-bold text-neutral-900">0円</p>
            <p className="text-xs text-neutral-500">必要な初期費用</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-neutral-900">5万円</p>
            <p className="text-xs text-neutral-500">3〜6ヶ月で目指す月収</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-neutral-900">5Step</p>
            <p className="text-xs text-neutral-500">やることはシンプル</p>
          </div>
        </div>
      </section>

      {/* Featured posts */}
      {featured.length > 0 && (
        <section className="mb-12">
          <div className="mb-4 flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" fill="currentColor" />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
              注目の記事
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {featured.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Category filter */}
      <section className="mb-6">
        <CategoryNav />
      </section>

      {/* Latest posts */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-neutral-400" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
            最新の記事
          </h2>
        </div>
        {recent.length === 0 ? (
          <p className="rounded-lg border border-dashed border-neutral-300 py-16 text-center text-sm text-neutral-400">
            まだ記事がありません。最初の記事を準備中です。
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {recent.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
