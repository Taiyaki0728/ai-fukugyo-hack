export const SITE = {
  name: "AI副業ハック",
  description:
    "AIを活用した副業の始め方から自動化まで。初心者でもわかる実践ロードマップ。",
  url: "https://ai-fukugyo-hack.com",
  ogImage: "/og-default.png",
  locale: "ja_JP",
} as const;

/**
 * 色の役割設計
 * - brand:   サイトのアイデンティティ（ロゴ・見出し等）
 * - action:  ボタン・リンク等の操作要素
 * - success: 完了・達成等のポジティブな状態
 * - warning: 注意・更新等の中間状態
 * - danger:  エラー・削除等のネガティブな状態
 * - neutral: テキスト・ボーダー・背景等の無彩色
 */
export const COLOR_ROLES = {
  brand: "text-emerald-700",
  action: "text-blue-600",
  success: "text-green-600",
  warning: "text-amber-600",
  danger: "text-red-600",
} as const;

export const NAV_ITEMS = [
  { label: "ホーム", href: "/" },
  { label: "ロードマップ", href: "/category/roadmap" },
  { label: "AI×ライティング", href: "/category/writing" },
  { label: "AI×画像", href: "/category/image-design" },
  { label: "AI自動化", href: "/category/automation" },
  { label: "AI×動画", href: "/category/video" },
  { label: "ツールレビュー", href: "/category/tool-review" },
  { label: "このサイトについて", href: "/about" },
] as const;
