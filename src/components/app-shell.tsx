import Link from "next/link";
import { navigationItems } from "@/lib/navigation";

type AppShellProps = { children: React.ReactNode };

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <div className="flex min-h-screen">
        {/* Sidebar — deep espresso atelier panel */}
        <aside className="hidden w-[18rem] flex-col justify-between bg-[var(--espresso)] px-8 py-10 text-[var(--cream)] lg:flex">
          <div>
            <div className="mb-12">
              <span className="inline-block h-9 w-9 rounded-full border border-[var(--gold)]">
                <span className="m-[10px] block h-[14px] w-[14px] rounded-full bg-[var(--gold)]" />
              </span>
              <p className="eyebrow mt-7">Closet OS</p>
              <h1 className="font-display mt-2 text-[2rem] leading-[1.1] text-[var(--cream)]">
                Stephanie<br />Style OS
              </h1>
              <p className="mt-5 text-[0.8125rem] leading-6 text-[var(--cream-soft)]">
                A private wardrobe atelier for refined outfit formulas,
                disciplined shopping, and elevated personal style.
              </p>
            </div>

            <nav className="space-y-1">
              {navigationItems.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between rounded-[10px] px-4 py-3 text-sm text-[var(--cream-soft)] transition hover:bg-white/[0.04] hover:text-[var(--cream)]"
                >
                  <span className="tracking-wide">{item.label}</span>
                  <span className="text-[0.625rem] tracking-[0.2em] text-[var(--gold)]/60 group-hover:text-[var(--gold)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <p className="text-[0.625rem] uppercase tracking-[0.3em] text-[var(--cream-soft)]/50">
            Release 0.2
          </p>
        </aside>

        {/* Main */}
        <main className="flex-1">
          <header className="px-6 pt-10 pb-6 lg:px-14 lg:pt-14">
            <div className="flex items-end justify-between">
              <div>
                <p className="eyebrow">Release 0.2</p>
                <h2 className="font-display mt-2 text-3xl tracking-tight text-[var(--ink)]">
                  App Foundation
                </h2>
              </div>
              <span className="hidden rounded-full border border-[var(--line)] px-4 py-2 text-[0.6875rem] uppercase tracking-[0.2em] text-[var(--ink-soft)] sm:inline-block">
                Owned ≠ Wishlist
              </span>
            </div>
            <hr className="hairline mt-6" />
          </header>

          <div className="px-6 pb-16 lg:px-14">{children}</div>
        </main>
      </div>
    </div>
  );
}
