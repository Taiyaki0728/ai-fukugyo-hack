import { notFound } from "next/navigation";
import { getAllPosts, CATEGORIES } from "@/lib/posts";
import { SITE } from "@/lib/constants";
import PostCard from "@/components/PostCard";
import CategoryNav from "@/components/CategoryNav";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return {};
  return {
    title: `${cat.name}の記事一覧`,
    description: `AI副業ハックの${cat.name}に関する記事一覧です。`,
    alternates: {
      canonical: `${SITE.url}/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const posts = getAllPosts().filter((p) => p.category === slug);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-extrabold text-neutral-900">
        {category.name}
      </h1>
      <p className="mb-8 text-sm text-neutral-500">
        {posts.length}件の記事
      </p>

      <div className="mb-8">
        <CategoryNav active={slug} />
      </div>

      {posts.length === 0 ? (
        <p className="rounded-lg border border-dashed border-neutral-300 py-16 text-center text-sm text-neutral-400">
          このカテゴリにはまだ記事がありません。
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
