import type { SavedOutfit, SavedOutfitPiece } from "@/lib/outfits/data";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatMachineLabel(value?: string | null) {
  if (!value) return "Not set";
  return value.replaceAll("_", " ").replaceAll("-", " ");
}

function getScore(outfit: SavedOutfit, key: string) {
  const value = outfit.scores[key];
  return typeof value === "number" ? value : "—";
}

function SavedPieceTile({ piece }: { piece: SavedOutfitPiece }) {
  return (
    <div
      className="flex aspect-[3/4] items-center justify-center rounded-[5px] border border-[var(--line)] bg-[var(--paper-2)] bg-contain bg-center bg-no-repeat p-3 text-center text-[0.58rem] font-semibold uppercase tracking-[0.12em] text-[var(--coffee)]"
      style={piece.imageUrl ? { backgroundImage: `url("${piece.imageUrl}")` } : undefined}
      title={piece.name}
    >
      {piece.imageUrl ? null : piece.name}
    </div>
  );
}

export function SavedOutfitCard({ outfit }: { outfit: SavedOutfit }) {
  const visiblePieces = outfit.selectedPieces.slice(0, 6);
  const pieceNames = outfit.selectedPieces.map((piece) => piece.name).join(" + ");

  return (
    <article className="rounded-[8px] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[0_18px_60px_rgba(74,47,34,0.05)]">
      <div className="grid grid-cols-3 gap-3">
        {visiblePieces.length > 0 ? (
          visiblePieces.map((piece, index) => (
            <SavedPieceTile key={`${piece.id ?? piece.name}-${index}`} piece={piece} />
          ))
        ) : (
          <div className="col-span-3 rounded-[5px] border border-dashed border-[var(--line)] bg-[var(--paper-2)] p-6 text-center text-sm text-[var(--ink-soft)]">
            No pieces saved.
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
            Saved · {formatDate(outfit.createdAt)}
          </p>
          <h3 className="font-display mt-3 text-[2.1rem] leading-none text-[var(--espresso)]">
            {outfit.title}
          </h3>
        </div>

        <span className="rounded-full border border-[rgba(88,119,74,0.28)] bg-[rgba(88,119,74,0.10)] px-3 py-1.5 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[var(--espresso)]">
          {outfit.status}
        </span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {["total", "color", "elevation"].map((scoreKey) => (
          <div key={scoreKey} className="rounded-[4px] border border-[var(--line)] bg-[var(--paper-2)] px-4 py-3">
            <p className="text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-[var(--caramel)]">
              {scoreKey}
            </p>
            <p className="mt-1 text-2xl font-semibold text-[var(--espresso)]">
              {getScore(outfit, scoreKey)}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-[4px] border border-[var(--line)] bg-[var(--paper-2)] p-4">
        <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-[var(--caramel)]">
          Pieces
        </p>
        <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
          {pieceNames || "No pieces saved."}
        </p>
      </div>

      <div className="mt-5 space-y-2 text-sm leading-6 text-[var(--ink-soft)]">
        <p><span className="font-semibold text-[var(--espresso)]">Formula: </span>{formatMachineLabel(outfit.formula)}</p>
        <p><span className="font-semibold text-[var(--espresso)]">Decision: </span>{formatMachineLabel(outfit.decision)}</p>
      </div>
    </article>
  );
}
