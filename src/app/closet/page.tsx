import type { ColorFamily } from "@/types/wardrobe";
import { mockOwnedItems } from "@/lib/mock-owned-items";

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

export default function ClosetPage() {
  return (
    <div>
      <section className="px-6 pb-14 pt-16 text-center md:px-10 md:pb-16 md:pt-20">
        <p className="eyebrow">Owned Wardrobe</p>

        <h1 className="font-display mx-auto mt-3 max-w-3xl text-5xl leading-[0.92] text-[var(--espresso)] md:text-7xl">
          Your closet,
          <br />
          <span className="italic text-[var(--coffee)]">clearly edited.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[var(--ink-soft)] md:text-base">
          Owned pieces only. This is the inventory you can actually style,
          repeat, and build outfits from.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10 md:pb-20">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="font-display text-4xl text-[var(--espresso)]">
            Owned pieces
          </h2>

          <button className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--caramel)]">
            + Add Piece
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mockOwnedItems.map((item) => (
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
                <span className="image-placeholder-label">Image space</span>
              </div>

              <div className="p-6">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--caramel)]">
                      {item.category}
                    </p>
                    <h3 className="font-display mt-3 text-3xl leading-tight text-[var(--espresso)]">
                      {item.name}
                    </h3>
                  </div>

                  <span className="rounded-full border border-[var(--line)] px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--coffee)]">
                    Owned
                  </span>
                </div>

                <div className="space-y-3 text-sm text-[var(--ink-soft)]">
                  <div className="flex justify-between gap-4 border-t border-[var(--line)] pt-3">
                    <span>Color</span>
                    <span className="text-[var(--espresso)]">{item.colorName}</span>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-[var(--line)] pt-3">
                    <span>Size</span>
                    <span className="text-[var(--espresso)]">{item.size ?? "—"}</span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.vibes.map((vibe) => (
                    <span
                      key={vibe}
                      className="rounded-full bg-[var(--cream)] px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--coffee)]"
                    >
                      {vibe}
                    </span>
                  ))}
                </div>

                {item.notes ? (
                  <p className="mt-5 text-sm leading-7 text-[var(--ink-soft)]">
                    {item.notes}
                  </p>
                ) : null}

                {item.stylingNotes ? (
                  <p className="mt-4 border-l border-[var(--caramel)] pl-4 text-sm italic leading-7 text-[var(--coffee)]">
                    {item.stylingNotes}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
