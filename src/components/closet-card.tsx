import type { ColorFamily, WardrobeItem } from "@/types/wardrobe";

const toneByColor: Record<ColorFamily, string> = {
  black: "#241711",
  brown: "#94714d",
  cream: "#c9b896",
  beige: "#c4aa84",
  white: "#cdbd9f",
  burgundy: "#6b2f2a",
  olive: "#6f6b43",
  camel: "#c4aa84",
  plum: "#5d3f4d",
  mustard: "#b58a3f",
  denim: "#35485e",
  blue: "#3f5f7f",
  statement: "#9a6f6c",
};

const styledLookCountById: Record<string, number> = {
  "owned-001": 8,
  "owned-002": 5,
  "owned-003": 6,
  "owned-004": 4,
  "owned-005": 7,
  "owned-006": 5,
};

function formatVibes(vibes: string[]) {
  return vibes.map((vibe) => vibe.toUpperCase()).join(" / ");
}

function formatColorLabel(value: string) {
  return value.toUpperCase();
}

export function ClosetCard({ item }: { item: WardrobeItem }) {
  const tone = toneByColor[item.colorFamily];
  const styledCount = styledLookCountById[item.id] ?? item.vibes.length + 2;

  return (
    <article className="overflow-hidden rounded-[3px] border border-[var(--line)] bg-[var(--paper-2)]">
      <div
        className="relative grid h-[22rem] place-items-center"
        style={{ background: tone }}
      >
        <span className="pointer-events-none absolute inset-4 rounded-[2px] border border-white/20" />

        <button
          type="button"
          className="absolute right-3 top-3 rounded-full border border-white/40 bg-[rgba(251,246,238,0.86)] px-2.5 py-1.5 text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-[var(--espresso)] backdrop-blur"
        >
          {item.imageUrl ? "Edit image" : "+ Image"}
        </button>

        <span className="relative text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-white/70">
          Closet image
        </span>
      </div>

      <div className="px-7 pb-7 pt-6">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[0.58rem] font-medium uppercase tracking-[0.24em] text-[var(--caramel)]">
            Owned · {item.category}
          </span>

          <span className="text-[0.58rem] font-medium uppercase tracking-[0.2em] text-[var(--coffee)]">
            Styled in{" "}
            <span className="font-display text-[1rem] leading-none text-[var(--espresso)]">
              {styledCount}
            </span>{" "}
            looks
          </span>
        </div>

        <h3 className="font-display mt-4 text-[2.15rem] leading-[1.05] text-[var(--espresso)]">
          {item.name}
        </h3>

        <div className="mt-4 flex items-center gap-2 border-b border-[var(--line)] pb-5">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: tone }}
          />
          <span className="text-[0.58rem] font-medium uppercase tracking-[0.24em] text-[var(--coffee)]">
            {formatColorLabel(item.colorName)} · Size {item.size ?? "—"}
          </span>
        </div>

        <div className="border-b border-[var(--line)] py-5">
          <p className="mb-3 text-[0.58rem] font-medium uppercase tracking-[0.24em] text-[var(--caramel)]">
            Style role
          </p>

          <p className="text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[var(--espresso)]">
            {formatVibes(item.vibes)}
          </p>
        </div>

        <div className="pt-5">
          <p className="mb-3 text-[0.58rem] font-medium uppercase tracking-[0.24em] text-[var(--caramel)]">
            Stylist&apos;s note
          </p>

          <p className="font-display text-[1.08rem] italic leading-[1.45] text-[var(--coffee)]">
            {item.stylingNotes ?? item.notes ?? "A useful closet piece ready to be styled into repeatable outfit formulas."}
          </p>
        </div>
      </div>
    </article>
  );
}
