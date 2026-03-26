"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_ITEMS, SITE } from "@/lib/constants";
import { Menu, X, Zap } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-emerald-700"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-700">
            <Zap className="h-4 w-4 text-white" fill="currentColor" />
          </div>
          {SITE.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-1 md:flex" aria-label="メインナビゲーション">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-1.5 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 md:hidden"
          aria-label="メニューを開く"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav id="mobile-nav" className="border-t border-neutral-100 bg-white px-4 py-3 md:hidden" aria-label="モバイルナビゲーション">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
