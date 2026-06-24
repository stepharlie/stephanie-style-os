import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import type { WardrobeItem } from "@/types/wardrobe";

type OutfitBuilderProps = {
  items: WardrobeItem[];
};

type OutfitSlot = {
  id: string;
  label: string;
  helper: string;
};

function activeOnly(items: WardrobeItem[]) {
  return items.filter((item) => (item.itemStatus ?? "active") === "active");
}

function countByCategory(items: WardrobeItem[]) {
  return items.reduce<Record<string, number>>((accumulator, item) => {
    accumulator[item.category] = (accumulator[item.category] ?? 0) + 1;
    return accumulator;
  }, {});
}

export function OutfitBuilder({ items }: OutfitBuilderProps) {
  const activeItems = activeOnly(items);
  const categoryCounts = countByCategory(activeItems);

  const slots: OutfitSlot[] = [
    {
      id: "top",
      label: "Top",
      helper: "Choose a top that sets the color story.",
    },
    {
      id: "bottom",
      label: "Bottom",
      helper: "Ground the outfit with the right silhouette.",
    },
    {
      id: "shoes",
      label: "Shoes",
      helper: "Match the outfit mood, not just the category.",
    },
    {
      id: "layer",
      label: "Layer",
      helper: "Optional blazer, vest, cardigan, or jacket.",
    },
    {
      id: "finishing",
      label: "Finishing piece",
      helper: "Bag, belt, jewelry, or styling detail.",
    },
  ];

  const categorySummary = [
    ["Tops", categoryCounts.top ?? 0],
    ["Bottoms", categoryCounts.bottom ?? 0],
    ["Shoes", categoryCounts.shoes ?? 0],
    ["Outerwear", categoryCounts.outerwear ?? 0],
    ["Bags", categoryCounts.bag ?? 0],
    ["Accessories", categoryCounts.accessory ?? 0],
    ["Jewelry", categoryCounts.jewelry ?? 0],
    ["Dresses", categoryCounts.dress ?? 0],
  ];

  return (
    <main className="pb-16 md:pb-20">
      <PageHeader
        eyebrow="Outfit Builder"
        title={
          <>
            Build from{" "}
            <em className="text-[var(--coffee)]">what you own.</em>
          </>
        }
        description="Foundation mode for outfit building. This page reads your active closet, but it is not making styling recommendations yet."
        asideEyebrow="Foundation Mode"
        asideText="No random outfits. Real recommendations need color, silhouette, occasion, weather, and vibe rules."
      >
        <div className="flex flex-wrap gap-5">
          <Link
            href="/closet"
            className="border-b-[1.5px] border-transparent pb-[3px] text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[var(--coffee)] no-underline transition hover:border-[var(--coffee)]"
          >
            Wardrobe Gallery
          </Link>
          <Link
            href="/outfits"
            className="border-b-[1.5px] border-[var(--espresso)] pb-[3px] text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[var(--espresso)] no-underline"
          >
            Outfit Builder
          </Link>
        </div>
      </PageHeader>

      <section className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="relative overflow-hidden rounded-[8px] border border-[var(--line)] bg-[var(--espresso)] p-8 text-[var(--paper)]">
            <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
              Active closet available
            </p>
            <p className="mt-6 font-display text-8xl leading-none">
              {activeItems.length}
            </p>
            <p className="mt-6 max-w-md text-sm leading-7 text-[rgba(255,248,237,0.76)]">
              These are the pieces eligible for future outfit formulas. Archived,
              donated, sold, and damaged pieces are excluded.
            </p>
          </article>

          <article className="rounded-[8px] border border-[var(--line)] bg-[var(--paper-2)] p-8">
            <p className="eyebrow mb-3">Recommendation engine</p>
            <h2 className="font-display text-4xl text-[var(--espresso)]">
              Not active yet
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">
              The first auto-generated combo was technically correct but stylistically
              wrong. Before suggesting outfits, the system needs rules for color harmony,
              occasion, shoe mood, proportions, weather, and your personal taste.
            </p>

            <div className="mt-6 rounded-[4px] border border-[var(--line)] bg-[var(--paper)] p-5">
              <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
                Next safe step
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--ink-soft)]">
                Build a manual slot picker first. Then add smart suggestions only after
                the rules are good enough to avoid random mismatches.
              </p>
            </div>
          </article>
        </div>

        <div className="mt-8 rounded-[10px] border border-[var(--line)] bg-[var(--paper-2)] p-5 md:p-7">
          <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow mb-2">Outfit formula structure</p>
              <h2 className="font-display text-4xl text-[var(--espresso)]">
                Slots we need to fill
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-[var(--ink-soft)]">
              This is the structure only. No fake “recommended outfit” until the picker and rules exist.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {slots.map((slot) => (
              <article
                key={slot.id}
                className="rounded-[8px] border border-dashed border-[var(--line)] bg-[var(--paper)] p-5"
              >
                <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
                  {slot.label}
                </p>
                <div className="mt-5 flex h-52 items-center justify-center rounded-[4px] bg-[var(--paper-2)] px-5 text-center text-sm leading-6 text-[var(--ink-soft)]">
                  {slot.helper}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-[8px] border border-[var(--line)] bg-[var(--paper-2)] p-7">
          <p className="eyebrow mb-3">Closet pieces by slot</p>
          <h2 className="font-display text-4xl text-[var(--espresso)]">
            What the builder can use
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {categorySummary.map(([label, count]) => (
              <div
                key={label}
                className="rounded-[4px] border border-[var(--line)] bg-[var(--paper)] px-5 py-4"
              >
                <p className="text-3xl font-semibold text-[var(--espresso)]">
                  {count}
                </p>
                <p className="mt-2 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-[var(--caramel)]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
