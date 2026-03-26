import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description: "AI副業ハックへのお問い合わせはこちらから。記事に関するご質問、掲載依頼、その他ご連絡をお待ちしています。",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-extrabold text-neutral-900">
        お問い合わせ
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-neutral-500">
        記事に関するご質問、掲載・広告のご依頼、誤りのご指摘など、お気軽にご連絡ください。
        通常2〜3営業日以内にご返信いたします。
      </p>
      <div className="mt-8">
        <ContactForm />
      </div>
    </div>
  );
}
