import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: "AI副業ハックのプライバシーポリシー。",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-extrabold text-neutral-900">
        プライバシーポリシー
      </h1>

      <div className="mt-6 space-y-6 text-sm leading-relaxed text-neutral-600">
        <p>
          AI副業ハック（以下「当サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。
        </p>

        <h2 className="text-base font-bold text-neutral-900">
          1. 収集する情報
        </h2>
        <p>
          当サイトでは、アクセス解析ツール（Google
          Analyticsなど）を使用する場合があります。これらのツールはCookieを使用してトラフィックデータを収集しますが、個人を特定する情報は含まれません。
        </p>
        <p>
          お問い合わせフォームからお送りいただいたお名前・メールアドレス・お問い合わせ内容は、ご返信およびサイト改善の目的でのみ使用し、第三者に提供することはありません。
        </p>

        <h2 className="text-base font-bold text-neutral-900">
          2. 広告について
        </h2>
        <p>
          当サイトでは、第三者配信の広告サービス（Google
          AdSenseなど）を利用する場合があります。広告配信事業者はCookieを使用してユーザーの興味に応じた広告を表示することがあります。
        </p>

        <h2 className="text-base font-bold text-neutral-900">
          3. アフィリエイトについて
        </h2>
        <p>
          当サイトでは、アフィリエイトプログラム（A8.net、もしもアフィリエイト等）を利用しています。
          記事内のリンクを経由して商品やサービスを購入された場合、当サイトが紹介料を受け取ることがあります。
          これにより読者に追加の費用が発生することはありません。
        </p>

        <h2 className="text-base font-bold text-neutral-900">
          4. 免責事項
        </h2>
        <p>
          当サイトの情報は、副業やAIツール活用に関する一般的な情報提供を目的としています。
          投資・税務等の判断はご自身の責任で行ってください。
          当サイトの情報に基づいて生じた損害について、一切の責任を負いません。
        </p>

        <h2 className="text-base font-bold text-neutral-900">
          5. お問い合わせ
        </h2>
        <p>
          プライバシーポリシーに関するお問い合わせは、メール（supertaiyaki0141@gmail.com）までご連絡ください。
        </p>

        <p className="text-xs text-neutral-400">最終更新日: 2026年3月26日</p>
      </div>
    </div>
  );
}
