import Link from "next/link";
import {
  leftNavigationItems,
  rightNavigationItems,
} from "@/lib/navigation";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <main className="min-h-screen bg-[var(--page)] px-3 py-5 text-[var(--ink)] md:px-6 md:py-8">
      <div className="editorial-shell mx-auto min-h-[calc(100vh-2.5rem)] max-w-7xl overflow-hidden rounded-[1.3rem] md:min-h-[calc(100vh-4rem)] md:rounded-[1.45rem]">
        <header className="border-b border-[var(--line)]">
          <nav className="grid min-h-16 grid-cols-3 items-center px-6 md:px-10">
            <div className="hidden items-center gap-8 md:flex">
              {leftNavigationItems.map((item) => (
                <Link key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </div>

            <Link
              href="/"
              className="font-display justify-self-center text-2xl uppercase tracking-[0.38em] text-[var(--espresso)]"
            >
              The Edit
            </Link>

            <div className="hidden items-center justify-end gap-8 md:flex">
              {rightNavigationItems.map((item) => (
                <Link key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-5 md:hidden">
              <Link href="/closet" className="nav-link">
                Closet
              </Link>
              <Link href="/wishlist" className="nav-link">
                Wishlist
              </Link>
            </div>
          </nav>
        </header>

        {children}
      </div>
    </main>
  );
}
