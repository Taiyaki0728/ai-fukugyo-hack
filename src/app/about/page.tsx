import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Shield, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "このサイトについて",
  description:
    "AI副業ハックは、AIを活用した副業の始め方から自動化まで、初心者でもわかる実践ロードマップを提供するサイトです。",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-extrabold text-neutral-900">
        このサイトについて
      </h1>

      <div className="mt-6 space-y-6 text-sm leading-relaxed text-neutral-600">
        <p>
          <strong className="text-neutral-900">AI副業ハック</strong>
          は、ChatGPT・Claude・Geminiなどの生成AIを活用した副業の始め方から収益化までを、
          初心者にもわかりやすく解説する情報サイトです。
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-neutral-200 bg-white p-4 text-center">
            <BookOpen className="mx-auto h-6 w-6 text-emerald-600" />
            <p className="mt-2 text-xs font-bold text-neutral-900">実践的な情報</p>
            <p className="mt-1 text-xs text-neutral-500">
              抽象論ではなく具体的な手順と数字
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-4 text-center">
            <Shield className="mx-auto h-6 w-6 text-emerald-600" />
            <p className="mt-2 text-xs font-bold text-neutral-900">正確な情報</p>
            <p className="mt-1 text-xs text-neutral-500">
              ファクトチェック済みの記事
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-4 text-center">
            <Mail className="mx-auto h-6 w-6 text-emerald-600" />
            <p className="mt-2 text-xs font-bold text-neutral-900">無料で読める</p>
            <p className="mt-1 text-xs text-neutral-500">
              全記事無料公開
            </p>
          </div>
        </div>

        <h2 className="text-lg font-bold text-neutral-900">免責事項</h2>
        <p>
          当サイトの情報は、執筆時点での正確性を期していますが、AIツールの仕様変更や料金改定により内容が古くなる場合があります。
          最新情報は各ツールの公式サイトをご確認ください。
          当サイトの情報に基づいて行った行動の結果について、一切の責任を負いかねます。
        </p>

        <h2 className="text-lg font-bold text-neutral-900">姉妹サイト</h2>
        <p>
          コピペで使えるAIプロンプト集
          <a
            href="https://prompt-jiten.com"
            className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            プロンプト辞典
          </a>
          も運営しています。
        </p>

        <h2 className="text-lg font-bold text-neutral-900">お問い合わせ</h2>
        <p>
          記事に関するご質問や誤りの指摘は
          <Link
            href="/contact"
            className="text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
          >
            お問い合わせフォーム
          </Link>
          よりお願いします。
        </p>
      </div>
    </div>
  );
}
