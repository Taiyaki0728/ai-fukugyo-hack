import Link from "next/link";
import { Rocket, ArrowRight } from "lucide-react";

export default function ArticleCTA() {
  return (
    <div className="mt-10 rounded-xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50/80 to-white p-6 text-center sm:p-8">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
        <Rocket className="h-6 w-6 text-emerald-700" />
      </div>
      <p className="mt-4 text-lg font-bold text-neutral-900">
        AI副業の始め方、もっと詳しく知りたい？
      </p>
      <p className="mt-2 text-sm text-neutral-500">
        完全ロードマップで、月5万円までのステップを確認しましょう。
      </p>
      <Link
        href="/category/roadmap"
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-800"
      >
        ロードマップを見る
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
