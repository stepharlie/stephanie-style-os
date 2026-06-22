import Link from "next/link";
import { navigationItems } from "@/lib/navigation";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#f8f3ed] text-[#2c211c]">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 border-r border-[#eadfd4] bg-[#fffaf5] px-6 py-8 lg:block">
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#9a6b4f]">
              Closet OS
            </p>
            <h1 className="mt-3 text-2xl font-semibold tracking-tight">
              Stephanie Style OS
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#765f53]">
              Personal wardrobe system for owned pieces, wishlist decisions,
              outfits, and intentional style planning.
            </p>
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-2xl px-4 py-3 text-sm font-medium text-[#4d3a32] transition hover:bg-[#f1e4d8] hover:text-[#2c211c]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="flex-1">
          <header className="border-b border-[#eadfd4] bg-[#fffaf5]/80 px-5 py-5 backdrop-blur lg:px-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9a6b4f]">
                Release 0.2
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                App Foundation
              </h2>
            </div>
          </header>

          <div className="px-5 py-8 lg:px-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
