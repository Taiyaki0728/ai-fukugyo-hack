import Link from "next/link";
import { SITE, NAV_ITEMS } from "@/lib/constants";
import { Zap, Mail, ExternalLink, BookOpen, MessagesSquare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-neutral-200 bg-neutral-50">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-700">
                <Zap className="h-3.5 w-3.5 text-white" fill="currentColor" />
              </div>
              <p className="font-bold text-emerald-700">{SITE.name}</p>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              {SITE.description}
            </p>
            <div className="mt-4 flex gap-3">
              <a
                href="mailto:supertaiyaki0141@gmail.com"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200/70 text-neutral-500 transition-colors hover:bg-neutral-300 hover:text-neutral-700"
                aria-label="メール"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              カテゴリ
            </p>
            <ul className="mt-3 space-y-2">
              {NAV_ITEMS.slice(1, -1).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-neutral-600 hover:text-neutral-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              その他
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-neutral-600 hover:text-neutral-900"
                >
                  このサイトについて
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-neutral-600 hover:text-neutral-900"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-neutral-600 hover:text-neutral-900"
                >
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          {/* Sister Sites */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              姉妹サイト
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="https://prompt-jiten.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  プロンプト辞典
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://ai-community.jp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900"
                >
                  <MessagesSquare className="h-3.5 w-3.5" />
                  AIコミュニティ
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-8 border-t border-neutral-200 pt-6 text-center text-xs text-neutral-400">
          &copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
