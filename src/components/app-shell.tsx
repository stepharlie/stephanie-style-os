"use client";

import Link from "next/link";
import { useState } from "react";
import { navigationItems } from "@/lib/navigation";

type AppShellProps = { children: React.ReactNode };

export function AppShell({ children }: AppShellProps) {
  const [open, setOpen] = useState(false);
  const half = Math.ceil(navigationItems.length / 2);
  const left = navigationItems.slice(0, half);
  const right = navigationItems.slice(half);

  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      {/* Top bar */}
      <header className="border-b border-[var(--line)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 lg:px-10">
          {/* Desktop: left nav */}
          <nav className="hidden flex-1 gap-7 lg:flex">
            {left.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--ink-soft)] transition hover:text-[var(--ink)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Brand */}
          <Link
            href="/"
            className="font-display text-xl tracking-[0.34em] text-[var(--ink)] lg:text-center"
          >
            THE&nbsp;EDIT
          </Link>

          {/* Desktop: right nav */}
          <nav className="hidden flex-1 justify-end gap-7 lg:flex">
            {right.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--ink-soft)] transition hover:text-[var(--ink)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile: menu button */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)] lg:hidden"
          >
            <span className="text-lg leading-none">{open ? "\u00d7" : "\u2261"}</span>
          </button>
        </div>

        {/* Mobile: dropdown nav */}
        {open && (
          <nav className="border-t border-[var(--line)] bg-[var(--paper-2)] px-5 py-3 lg:hidden">
            {navigationItems.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-[var(--line)] py-3.5 text-sm text-[var(--ink)] last:border-0"
              >
                <span className="tracking-wide">{item.label}</span>
                <span className="text-[0.625rem] tracking-[0.18em] text-[var(--caramel)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </nav>
        )}
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-5 pb-20 lg:px-10">{children}</main>
    </div>
  );
}
