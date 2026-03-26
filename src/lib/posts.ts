import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const POSTS_DIR = path.join(process.cwd(), "src/content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  thumbnail?: string;
  readingTime: string;
  featured?: boolean;
};

export type Post = PostMeta & {
  content: string;
};

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
      const { data, content } = matter(raw);
      const stats = readingTime(content);

      return {
        slug,
        title: data.title ?? "",
        description: data.description ?? "",
        date: data.date ?? "",
        updatedAt: data.updatedAt,
        category: data.category ?? "uncategorized",
        tags: data.tags ?? [],
        thumbnail: data.thumbnail,
        readingTime: stats.text,
        featured: data.featured ?? false,
      } satisfies PostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const stats = readingTime(content);

  return {
    slug,
    title: data.title ?? "",
    description: data.description ?? "",
    date: data.date ?? "",
    updatedAt: data.updatedAt,
    category: data.category ?? "uncategorized",
    tags: data.tags ?? [],
    thumbnail: data.thumbnail,
    readingTime: stats.text,
    featured: data.featured ?? false,
    content,
  };
}

export function getCategories(): { slug: string; name: string; count: number }[] {
  const posts = getAllPosts();
  const map = new Map<string, number>();

  for (const post of posts) {
    map.set(post.category, (map.get(post.category) ?? 0) + 1);
  }

  return CATEGORIES.map((cat) => ({
    ...cat,
    count: map.get(cat.slug) ?? 0,
  }));
}

export const CATEGORIES = [
  { slug: "roadmap", name: "AI副業ロードマップ" },
  { slug: "writing", name: "AI×ライティング" },
  { slug: "image-design", name: "AI×画像・デザイン" },
  { slug: "automation", name: "AI自動化" },
  { slug: "video", name: "AI×動画" },
  { slug: "programming", name: "AI×プログラミング" },
  { slug: "tool-review", name: "AIツールレビュー" },
  { slug: "earnings", name: "収益報告" },
  { slug: "legal", name: "注意点・法律" },
] as const;
