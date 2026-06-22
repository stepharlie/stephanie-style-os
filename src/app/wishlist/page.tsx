import type {
  ColorFamily,
  PricePoint,
  WishlistPriorityTier,
} from "@/types/wardrobe";
import { mockWishlistItems } from "@/lib/mock-wishlist-items";

const prioritySections: {
  tier: WishlistPriorityTier;
  number: string;
  title: string;
  description: string;
}[] = [
  {
    tier: "foundation-buys",
    number: "01",
    title: "Foundation buys",
    description:
      "Buy first. These pieces build the most outfits and fill the most important closet gaps.",
  },
  {
    tier: "color-builders",
    number: "02",
    title: "Color builders",
    description:
      "Next priority. These add intentional color while still working with the existing closet.",
  },
  {
    tier: "statement-review",
    number: "03",
    title: "Statement review",
    description:
      "Only buy if the piece creates enough outfits or brings a strong fun/tropical payoff.",
  },
];

const imageToneByColor: Record<ColorFamily, string> = {
  black: "bg-[#241711]",
  brown: "bg-[#94714d]",
  cream: "bg-[#eadcc8]",
  beige: "bg-[#d9c6a9]",
  white: "bg-[#f8f1e8]",
  burgundy: "bg-[#6b2f2a]",
  olive: "bg-[#6f6b43]",
  camel: "bg-[#c4aa84]",
  plum: "bg-[#5d3f4d]",
  mustard: "bg-[#b58a3f]",
  denim: "bg-[#35485e]",
  blue: "bg-[#3f5f7f]",
  statement: "bg-[#c7a2a0]",
};

function formatPrice(price?: number) {
  if (typeof price !== "number") return "—";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function PriceHistory({ points = [] }: { points?: PricePoint[] }) {
  if (points.length === 0) {
    return (
      <p className="text-sm leading-6 text-[var(--ink-soft)]">
        No price history yet.
      </p>
    );
  }

  const prices = points.map((point) => point.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = Math.max(max - min, 1);

  return (
    <div>
      <div className="flex h-12 items-end gap-1.5">
        {points.map((point) => {
          const height = 22 + ((point.price - min) / range) * 26;

          return (
            <div
              key={`${point.date}-${point.price}`}
              className="flex flex-1 items-end"
              title={`${point.date}: ${formatPrice(point.price)}`}
            >
              <div
                className="w-full rounded-full bg-[var(--caramel)]/70"
                style={{ height }}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-2 flex justify-between text-[0.62rem] uppercase tracking-[0.18em] text-[var(--ink-soft)]">
        <span>High {formatPrice(max)}</span>
        <span>Low {formatPrice(min)}</span>
      </div>
    </div>
  );
}

export default function WishlistPage() {
  const groupedWishlist = prioritySections.map((section) => ({
    ...section,
    items: mockWishlistItems
      .filter((item) => item.priorityTier === section.tier)
      .sort((a, b) => a.purchaseOrder - b.purchaseOrder),
  }));

  return (
    <div>
      <section className="px-6 pb-14 pt-16 text-center md:px-10 md:pb-16 md:pt-20">
        <p className="eyebrow">Shopping Discipline</p>

        <h1 className="font-display mx-auto mt-3 max-w-3xl text-5xl leading-[0.92] text-[var(--espresso)] md:text-7xl">
          Curated wishlist,
          <br />
          <span className="italic text-[var(--coffee)]">by priority.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[var(--ink-soft)] md:text-base">
          Wishlist pieces are grouped by purchase priority so the next buy is
          based on closet impact, not impulse.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10 md:pb-20">
        <div className="mb-10 flex items-center justify-between gap-4">
          <h2 className="font-display text-4xl text-[var(--espresso)]">
            Buy order
          </h2>

          <button className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--caramel)]">
            + Review Item
          </button>
        </div>

        <div className="space-y-14">
          {groupedWishlist.map((section) => (
            <section key={section.tier}>
              <div className="mb-6 grid gap-4 border-t border-[var(--line)] pt-6 md:grid-cols-[5rem_1fr]">
                <p className="font-display text-5xl leading-none text-[var(--caramel)]">
                  {section.number}
                </p>

                <div>
                  <h3 className="font-display text-4xl text-[var(--espresso)]">
                    {section.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">
                    {section.description}
                  </p>
                </div>
              </div>

              {section.items.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {section.items.map((item) => (
                    <article
                      key={item.id}
                      className="lift overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--paper-2)] shadow-soft"
                    >
                      <div
                        className={`image-frame h-72 ${imageToneByColor[item.colorFamily]}`}
                      >
                        <button type="button" className="image-action">
                          {item.imageUrl ? "Edit image" : "+ Image"}
                        </button>
                        <span className="image-placeholder-label">
                          Wishlist image
                        </span>
                      </div>

                      <div className="p-6">
                        <div className="mb-6 flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--caramel)]">
                              Buy #{item.purchaseOrder} · {item.category}
                            </p>
                            <h3 className="font-display mt-3 text-3xl leading-tight text-[var(--espresso)]">
                              {item.name}
                            </h3>
                          </div>

                          <span className="rounded-full bg-[var(--espresso)] px-3 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-[var(--paper-2)]">
                            {item.decision}
                          </span>
                        </div>

                        <div className="space-y-3 text-sm text-[var(--ink-soft)]">
                          <div className="flex justify-between gap-4 border-t border-[var(--line)] pt-3">
                            <span>Color</span>
                            <span className="text-[var(--espresso)]">
                              {item.colorName}
                            </span>
                          </div>
                          <div className="flex justify-between gap-4 border-t border-[var(--line)] pt-3">
                            <span>Gap</span>
                            <span className="text-[var(--espresso)]">
                              {item.closetGap}
                            </span>
                          </div>
                          <div className="flex justify-between gap-4 border-t border-[var(--line)] pt-3">
                            <span>Duplicate risk</span>
                            <span className="text-[var(--espresso)]">
                              {item.duplicateRisk}
                            </span>
                          </div>
                        </div>

                        <div className="mt-5 grid grid-cols-3 gap-3">
                          <div className="rounded-lg bg-[var(--cream)] p-4 text-center">
                            <p className="font-display text-3xl text-[var(--espresso)]">
                              {item.priorityScore}
                            </p>
                            <p className="text-[0.58rem] uppercase tracking-[0.18em] text-[var(--caramel)]">
                              Priority
                            </p>
                          </div>

                          <div className="rounded-lg bg-[var(--cream)] p-4 text-center">
                            <p className="font-display text-3xl text-[var(--espresso)]">
                              {item.outfitPotential}
                            </p>
                            <p className="text-[0.58rem] uppercase tracking-[0.18em] text-[var(--caramel)]">
                              Outfits
                            </p>
                          </div>

                          <div className="rounded-lg bg-[var(--cream)] p-4 text-center">
                            <p className="font-display text-3xl text-[var(--espresso)]">
                              {item.closetImpactScore}
                            </p>
                            <p className="text-[0.58rem] uppercase tracking-[0.18em] text-[var(--caramel)]">
                              Impact
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 rounded-xl border border-[var(--line)] bg-[var(--paper)] p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[var(--caramel)]">
                                Current Price
                              </p>
                              <p className="font-display mt-1 text-3xl text-[var(--espresso)]">
                                {formatPrice(item.currentPrice)}
                              </p>
                            </div>

                            <div className="text-right">
                              <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[var(--caramel)]">
                                Target
                              </p>
                              <p className="mt-1 text-sm text-[var(--coffee)]">
                                {formatPrice(item.targetPrice)}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4">
                            <PriceHistory points={item.priceHistory} />
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-3">
                            <span className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--coffee)]">
                              <span className="price-dot" />
                              {item.priceWatch ? "Watching price" : "Watch off"}
                            </span>

                            <a
                              href={item.productUrl ?? "#"}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-full bg-[var(--espresso)] px-4 py-2 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-[var(--paper-2)]"
                            >
                              View item
                            </a>
                          </div>
                        </div>

                        <p className="mt-5 text-sm leading-7 text-[var(--ink-soft)]">
                          {item.notes}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-7 text-[var(--ink-soft)]">
                  No pieces in this priority group yet.
                </p>
              )}
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
