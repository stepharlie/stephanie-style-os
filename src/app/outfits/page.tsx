import { mockOutfits } from "@/lib/mock-outfits";

const collageColors = [
  "bg-[#d9c6a9]",
  "bg-[#c6aa80]",
  "bg-[#94714d]",
  "bg-[#e8dcc8]",
  "bg-[#5b4636]",
  "bg-[#eadcc8]",
];

export default function OutfitsPage() {
  return (
    <div>
      <section className="px-6 pb-14 pt-16 text-center md:px-10 md:pb-16 md:pt-20">
        <p className="eyebrow">Outfit Formulas</p>

        <h1 className="font-display mx-auto mt-3 max-w-3xl text-5xl leading-[0.92] text-[var(--espresso)] md:text-7xl">
          Saved looks,
          <br />
          <span className="italic text-[var(--coffee)]">repeatable style.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[var(--ink-soft)] md:text-base">
          When an outfit feels comfortable, polished, and elegant, it becomes a
          formula you can recreate.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10 md:pb-20">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="font-display text-4xl text-[var(--espresso)]">
            Saved formulas
          </h2>

          <button className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--caramel)]">
            + New Look
          </button>
        </div>

        <div className="columns-1 gap-4 md:columns-2 xl:columns-3">
          {mockOutfits.map((outfit, index) => (
            <article key={outfit.id} className="pin-card lift mb-4">
              <div className="outfit-collage p-3">
                <div
                  className={`image-frame outfit-collage-main ${collageColors[index % collageColors.length]}`}
                >
                  <span className="image-placeholder-label">Main look</span>
                </div>

                <div
                  className={`image-frame ${collageColors[(index + 1) % collageColors.length]}`}
                >
                  <span className="image-placeholder-label">Piece</span>
                </div>

                <div
                  className={`image-frame ${collageColors[(index + 2) % collageColors.length]}`}
                >
                  <span className="image-placeholder-label">Detail</span>
                </div>
              </div>

              <div className="p-6 pt-3">
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--caramel)]">
                      {outfit.occasion}
                    </p>
                    <h3 className="font-display mt-3 text-3xl leading-tight text-[var(--espresso)]">
                      {outfit.name}
                    </h3>
                  </div>

                  <span className="rounded-full border border-[var(--line)] px-3 py-1 text-[0.65rem] uppercase tracking-[0.16em] text-[var(--coffee)]">
                    {outfit.status}
                  </span>
                </div>

                <p className="text-sm leading-7 text-[var(--ink-soft)]">
                  {outfit.notes}
                </p>

                <div className="mt-6">
                  <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--caramel)]">
                    Pieces
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-[var(--ink-soft)]">
                    {outfit.pieces.map((piece) => (
                      <li key={piece}>• {piece}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {outfit.colorStory.map((color) => (
                    <span
                      key={color}
                      className="rounded-full bg-[var(--cream)] px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--coffee)]"
                    >
                      {color}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
