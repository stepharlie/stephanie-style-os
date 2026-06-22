import { mockOutfits } from "@/lib/mock-outfits";
import { mockOwnedItems } from "@/lib/mock-owned-items";
import { mockWishlistItems } from "@/lib/mock-wishlist-items";

const stats = [
  {
    value: String(mockOwnedItems.length),
    label: "Owned Pieces",
  },
  {
    value: String(mockOutfits.length),
    label: "Saved Outfits",
  },
  {
    value: String(mockWishlistItems.length),
    label: "Wishlist",
  },
];

const outfitBoards = [
  {
    title: "Office polish",
    color: "bg-[#d9c6a9]",
  },
  {
    title: "Warm neutral",
    color: "bg-[#c6aa80]",
  },
  {
    title: "Espresso base",
    color: "bg-[#94714d]",
  },
  {
    title: "Soft cream",
    color: "bg-[#e8dcc8]",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <section className="px-6 pb-16 pt-20 text-center md:px-10 md:pb-20 md:pt-24">
        <p className="eyebrow">Private Wardrobe Atelier</p>

        <h1 className="font-display mx-auto mt-3 max-w-3xl text-5xl leading-[0.9] text-[var(--espresso)] md:text-7xl">
          Curated closet,
          <br />
          <span className="italic text-[var(--coffee)]">polished</span>{" "}
          outfits.
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[var(--ink-soft)] md:text-base">
          A styling system for owned pieces, wishlist discipline, and outfits
          that feel intentional.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 md:px-10">
        <hr className="hairline" />

        <div className="grid grid-cols-1 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={[
                "py-9 text-center md:py-10",
                index > 0 ? "md:stat-divider" : "",
              ].join(" ")}
            >
              <p className="font-display text-5xl leading-none text-[var(--espresso)]">
                {stat.value}
              </p>
              <p className="mt-3 text-[0.68rem] font-medium uppercase tracking-[0.34em] text-[var(--caramel)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <hr className="hairline" />
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 pt-11 md:px-10 md:pb-20">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="font-display text-4xl text-[var(--espresso)]">
            Outfit board
          </h2>

          <button className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--caramel)]">
            + New Look
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {outfitBoards.map((board) => (
            <article
              key={board.title}
              className={`outfit-card lift ${board.color} p-5`}
            >
              <div className="flex h-full flex-col justify-end">
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-white/75">
                  {board.title}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
