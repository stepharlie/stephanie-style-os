import type { WardrobeItem } from "@/types/wardrobe";
import { AtelierPlaceholder } from "@/components/atelier-placeholder";

type ClosetCardProps = {
  item: WardrobeItem;
};

const styledLookCountById: Record<string, number> = {
  "owned-001": 8,
  "owned-002": 7,
  "owned-003": 4,
  "owned-004": 6,
  "owned-005": 3,
  "owned-016": 9,
  "owned-017": 8,
  "owned-018": 7,
  "owned-019": 5,
  "owned-023": 6,
  "owned-026": 5,
  "owned-028": 10,
};

function formatCategory(category: string) {
  return category.replace("-", " ");
}

export function ClosetCard({ item }: ClosetCardProps) {
  const styledCount = styledLookCountById[item.id] ?? Math.max(2, item.vibes.length + 2);

  return (
    <article className="group overflow-hidden rounded-[4px] border border-[var(--line)] bg-[var(--paper)] shadow-[0_18px_60px_rgba(74,47,34,0.06)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(74,47,34,0.1)]">
      <div className="bg-[var(--paper-2)] p-4">
        {item.imageUrl ? (
          <div
            className="h-[22rem] rounded-[3px] bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${item.imageUrl})` }}
            aria-label={item.name}
          />
        ) : (
          <AtelierPlaceholder
            name={item.name}
            colorName={item.colorName}
            colorFamily={item.colorFamily}
            category={formatCategory(item.category)}
            className="h-[22rem]"
          />
        )}
      </div>

      <div className="px-6 pb-6 pt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
              {item.colorName} · {item.size ?? "One size"}
            </p>
            <h3 className="font-display mt-2 text-[2rem] leading-none text-[var(--espresso)]">
              {item.name}
            </h3>
          </div>

          <p className="shrink-0 pt-1 text-right text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[var(--coffee)]">
            Styled
            <br />
            {styledCount}x
          </p>
        </div>

        <p className="mt-5 text-[0.58rem] font-medium uppercase tracking-[0.22em] text-[var(--ink-soft)]">
          {item.vibes.join(" / ")}
        </p>

        <div className="mt-6 border-t border-[var(--line)] pt-5">
          <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
            Stylist&apos;s note
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">
            {item.stylingNotes ?? item.notes}
          </p>
        </div>
      </div>
    </article>
  );
}
