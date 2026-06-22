import type { ColorFamily } from "@/types/wardrobe";
import type { OutfitLook, OutfitPiece } from "@/lib/mock-outfits";

const toneByColor: Record<ColorFamily, string> = {
  black: "#241711",
  brown: "#94714d",
  cream: "#d7c7a7",
  beige: "#c8b08b",
  white: "#dfd2bd",
  burgundy: "#6b2f2a",
  olive: "#6f6b43",
  camel: "#c4aa84",
  plum: "#5d3f4d",
  mustard: "#b58a3f",
  denim: "#43566d",
  blue: "#5b7a9b",
  statement: "#b89392",
};

function renderPiece(piece: OutfitPiece) {
  const tone = toneByColor[piece.colorFamily];

  return (
    <div
      key={piece.id}
      className="absolute overflow-hidden rounded-[28px] shadow-[0_20px_40px_rgba(36,23,17,0.08)]"
      style={{
        top: piece.top,
        left: piece.left,
        width: piece.width,
        height: piece.height,
        transform: `rotate(${piece.rotate ?? 0}deg)`,
      }}
    >
      <div
        className="relative h-full w-full rounded-[28px]"
        style={{
          background: piece.imageUrl
            ? "transparent"
            : `linear-gradient(180deg, ${tone} 0%, ${tone}F0 100%)`,
          backgroundImage: piece.imageUrl ? `url(${piece.imageUrl})` : undefined,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      >
        <span className="pointer-events-none absolute inset-3 rounded-[22px] border border-white/18" />

        {!piece.imageUrl ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            <p className="text-[0.52rem] font-semibold uppercase tracking-[0.24em] text-white/65">
              {piece.slot}
            </p>
            <p className="font-display mt-3 text-[1rem] leading-tight text-white/92">
              {piece.name}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function OutfitCollageCard({ look }: { look: OutfitLook }) {
  return (
    <article className="overflow-hidden rounded-[4px] border border-[var(--line)] bg-[var(--paper-2)]">
      <div
        className="relative h-[25rem] overflow-hidden border-b border-[var(--line)]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,251,245,0.95) 0%, rgba(246,236,220,0.68) 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.58),transparent_35%)]" />

        <div className="absolute right-5 top-5 rounded-full border border-[rgba(255,255,255,0.35)] bg-[rgba(251,246,238,0.88)] px-3 py-2 text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-[var(--espresso)] backdrop-blur">
          Collage view
        </div>

        {look.pieces.map(renderPiece)}
      </div>

      <div className="px-7 pb-7 pt-6">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[0.58rem] font-medium uppercase tracking-[0.24em] text-[var(--caramel)]">
            {look.vibe} · {look.occasion}
          </span>

          <span className="text-[0.55rem] font-medium uppercase tracking-[0.2em] text-[var(--coffee)]">
            {look.saved ? "Saved formula" : "Styled look"}
          </span>
        </div>

        <h3 className="font-display mb-4 mt-3 text-[2.15rem] leading-[1.04] text-[var(--espresso)]">
          {look.title}
        </h3>

        <p className="text-[0.98rem] leading-7 text-[var(--ink-soft)]">
          {look.caption}
        </p>

        <div className="mt-5 border-y border-[var(--line)] py-4">
          <p className="mb-3 text-[0.55rem] font-medium uppercase tracking-[0.22em] text-[var(--caramel)]">
            Formula
          </p>

          <div className="flex flex-wrap gap-2.5">
            {look.formula.map((item) => (
              <span
                key={item}
                className="rounded-full border border-[var(--line)] px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.18em] text-[var(--coffee)]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <p className="font-display mt-5 text-[1.05rem] italic leading-[1.5] text-[var(--coffee)]">
          {look.notes}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-[var(--line)] pt-4">
          <span className="text-[0.55rem] font-medium uppercase tracking-[0.22em] text-[var(--caramel)]">
            {String(look.pieces.length).padStart(2, "0")} pieces
          </span>

          <div className="flex items-center gap-5">
            <button
              type="button"
              className="border-b-[1.5px] border-[var(--espresso)] pb-[3px] text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-[var(--espresso)]"
            >
              Open look
            </button>

            <button
              type="button"
              className="border-b-[1.5px] border-transparent pb-[3px] text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-[var(--coffee)] transition hover:border-[var(--coffee)]"
            >
              Add to log
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
