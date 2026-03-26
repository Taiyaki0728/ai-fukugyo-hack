import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, CATEGORIES } from "@/lib/posts";
import { renderMarkdown } from "@/lib/markdown";
import { SITE } from "@/lib/constants";
import Link from "next/link";
import type { Metadata } from "next";
import ReadingProgress from "@/components/ReadingProgress";
import TableOfContents from "@/components/TableOfContents";
import RelatedPosts from "@/components/RelatedPosts";
import ArticleCTA from "@/components/ArticleCTA";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${SITE.url}/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      url,
      images: [
        {
          url: `${SITE.url}${SITE.ogImage}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const categoryName =
    CATEGORIES.find((c) => c.slug === post.category)?.name ?? post.category;

  // Related posts: same category, excluding current
  const related = getAllPosts()
    .filter((p) => p.category === post.category && p.slug !== slug)
    .slice(0, 4);

  // If not enough from same category, fill with other posts
  const otherPosts =
    related.length < 2
      ? getAllPosts()
          .filter((p) => p.slug !== slug && !related.find((r) => r.slug === p.slug))
          .slice(0, 4 - related.length)
      : [];

  const allRelated = [...related, ...otherPosts];

  const bodyHtml = renderMarkdown(post.content);

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    author: {
      "@type": "Person",
      name: "AI副業ハック編集部",
      url: `${SITE.url}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/icon-192.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/blog/${slug}`,
    },
    image: `${SITE.url}${SITE.ogImage}`,
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ホーム",
        item: SITE.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: categoryName,
        item: `${SITE.url}/category/${post.category}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE.url}/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdArticle),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdBreadcrumb),
        }}
      />
      <ReadingProgress />

      <article className="mx-auto max-w-4xl px-4 py-10">
        {/* Breadcrumb */}
        <nav aria-label="パンくずリスト" className="mb-6 flex items-center gap-1.5 text-xs text-neutral-400">
          <Link href="/" className="hover:text-neutral-600">
            ホーム
          </Link>
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link
            href={`/category/${post.category}`}
            className="hover:text-neutral-600"
          >
            {categoryName}
          </Link>
        </nav>

        {/* Header — the hero of the page */}
        <header className="mb-8 rounded-xl bg-white p-6 shadow-sm ring-1 ring-neutral-200/60 sm:p-8">
          <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            {categoryName}
          </span>
          <h1 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-neutral-900 sm:text-3xl">
            {post.title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-neutral-500">
            {post.description}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-neutral-100 pt-4 text-sm text-neutral-400">
            <div className="flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            {post.updatedAt && (
              <span className="rounded bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                更新:{" "}
                {new Date(post.updatedAt).toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            )}
            <div className="flex items-center gap-1.5">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{post.readingTime}</span>
            </div>
          </div>
        </header>

        {/* Content layout: TOC sidebar on desktop, inline on mobile */}
        <div className="gap-8 lg:grid lg:grid-cols-[1fr_240px]">
          {/* Main content */}
          <div>
            {/* Mobile TOC */}
            <div className="mb-8 lg:hidden">
              <TableOfContents />
            </div>

            {/* Article body */}
            <div
              className="article-body"
              dangerouslySetInnerHTML={{ __html: bodyHtml }}
            />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-neutral-200 pt-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-500 transition-colors hover:bg-neutral-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <ArticleCTA />

            {/* Related posts */}
            <RelatedPosts posts={allRelated} />
          </div>

          {/* Desktop TOC sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <TableOfContents />
            </div>
          </aside>
        </div>
      </article>
    </>
  );
}
