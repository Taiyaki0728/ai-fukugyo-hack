import Link from "next/link";
import { FileQuestion, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-neutral-100">
        <FileQuestion className="h-8 w-8 text-neutral-400" />
      </div>
      <h1 className="mt-6 text-2xl font-extrabold text-neutral-900">
        ページが見つかりません
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-neutral-500">
        お探しのページは移動または削除された可能性があります。
        URLに間違いがないかご確認ください。
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
        >
          <Home className="h-4 w-4" />
          ホームへ戻る
        </Link>
        <Link
          href="/category/roadmap"
          className="inline-flex items-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
        >
          <ArrowLeft className="h-4 w-4" />
          ロードマップを見る
        </Link>
      </div>
    </div>
  );
}
