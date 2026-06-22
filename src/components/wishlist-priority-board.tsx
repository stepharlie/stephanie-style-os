"use client";

import { useState } from "react";
import {
  BuyOrderFilter,
  matchesFilter,
  type BuyOrderFilterId,
} from "@/components/buy-order-filter";
import type {
  ColorFamily,
  PricePoint,
  WishlistItem,
  WishlistPriorityTier,
} from "@/types/wardrobe";
import { mockWishlistItems } from "@/lib/mock-wishlist-items";

const prioritySections: {
  tier: WishlistPriorityTier;
  title: string;
  description: string;
}[] = [
  {
    tier: "foundation-buys",
    title: "Foundation buys",
    description:
      "Buy first. These pieces build the most outfits and fill the most important closet gaps.",
  },
  {
    tier: "color-builders",
    title: "Color builders",
    description:
      "Next priority. These add intentional color while still working with the existing closet.",
  },
  {
    tier: "statement-review",
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

function sortWishlistItems(items: WishlistItem[]) {
  return [...items].sort((a, b) => {
    if (a.purchaseOrder !== b.purchaseOrder) {
      return a.purchaseOrder - b.purchaseOrder;
    }

    if (b.closetImpactScore !== a.closetImpactScore) {
      return b.closetImpactScore - a.closetImpactScore;
    }

    if (b.priorityScore !== a.priorityScore) {
      return b.priorityScore - a.priorityScore;
    }

    return b.outfitPotential - a.outfitPotential;
  });
}

function WishlistCard({ item }: { item: WishlistItem }) {
  return (
    <article className="lift overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--paper-2)] shadow-soft">
      <div className={`image-frame h-72 ${imageToneByColor[item.colorFamily]}`}>
        <button type="button" className="image-action">
          {item.imageUrl ? "Edit image" : "+ Image"}
        </button>
        <span className="image-placeholder-label">Wishlist image</span>
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
            <span className="text-[var(--espresso)]">{item.colorName}</span>
          </div>
          <div className="flex justify-between gap-4 border-t border-[var(--line)] pt-3">
            <span>Gap</span>
            <span className="text-[var(--espresso)]">{item.closetGap}</span>
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
  );
}

export function WishlistPriorityBoard() {
  const [activeFilter, setActiveFilter] = useState<BuyOrderFilterId>("all");

  const filteredItems = sortWishlistItems(
    mockWishlistItems.filter((item) => matchesFilter(item, activeFilter)),
  );

  const groupedWishlist = prioritySections.map((section) => ({
    ...section,
    items: filteredItems.filter((item) => item.priorityTier === section.tier),
  }));

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10 md:pb-20">
      <BuyOrderFilter
        items={mockWishlistItems}
        active={activeFilter}
        onChange={setActiveFilter}
      />

      {activeFilter === "all" ? (
        <div className="space-y-14">
          {groupedWishlist.map((section) => (
            <section key={section.tier}>
              <div className="mb-6 border-t border-[var(--line)] pt-7">
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--caramel)]">
                  Purchase tier
                </p>

                <h3 className="font-display mt-3 text-4xl text-[var(--espresso)]">
                  {section.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">
                  {section.description}
                </p>
              </div>

              {section.items.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {section.items.map((item) => (
                    <WishlistCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-[var(--line)] bg-[var(--paper-2)] p-10 text-center">
                  <p className="font-display text-3xl text-[var(--espresso)]">
                    No pieces in this priority group yet.
                  </p>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[var(--ink-soft)]">
                    Add a wishlist piece here when you identify a new closet
                    priority.
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>
      ) : (
        <section>
          <div className="mb-6 border-t border-[var(--line)] pt-7">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--caramel)]">
              Filtered edit
            </p>
            <h3 className="font-display mt-3 text-4xl text-[var(--espresso)]">
              {activeFilter === "foundation-buys"
                ? "Foundation buys"
                : activeFilter === "color-builders"
                  ? "Color builders"
                  : activeFilter === "statement-review"
                    ? "Statement review"
                    : activeFilter === "price-watch"
                      ? "Price watch"
                      : activeFilter === "buy-priority"
                        ? "Priority picks"
                        : activeFilter === "consider"
                          ? "Consider list"
                          : "Selected pieces"}
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">
              Showing only the pieces that match this filter, ordered by purchase
              priority and closet impact.
            </p>
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item) => (
                <WishlistCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-[var(--line)] bg-[var(--paper-2)] p-10 text-center">
              <p className="font-display text-3xl text-[var(--espresso)]">
                No pieces match this filter.
              </p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[var(--ink-soft)]">
                Try another wishlist filter or add a new item to this category.
              </p>
            </div>
          )}
        </section>
      )}
    </section>
  );
}
