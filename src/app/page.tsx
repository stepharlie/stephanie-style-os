const stats = [
  { num: "48", label: "Owned pieces" },
  { num: "12", label: "Saved outfits" },
  { num: "9", label: "Wishlist" },
];

const board = [
  { name: "Trench", bg: "#d8c6ad", dark: false },
  { name: "Silk blouse", bg: "#c2a884", dark: false },
  { name: "Trousers", bg: "#8a6b4a", dark: true },
  { name: "Loafers", bg: "#e6d8c3", dark: false },
];

const palette = ["#1f1611", "#5b4636", "#a9794e", "#c39b6f", "#e6d8c3"];

export default function DashboardPage() {
  return (
    <div>
      {/* Hero */}
      <section className="px-1 pt-14 pb-4 text-center sm:pt-16">
        <p className="eyebrow">Private Wardrobe Atelier</p>
        <h1 className="font-display mx-auto mt-4 max-w-3xl text-[2.5rem] leading-[1.02] text-[var(--ink)] sm:text-[3.25rem]">
          Curated closet,{" "}
          <em className="italic text-[var(--coffee)]">polished</em> outfits.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[0.875rem] leading-7 text-[var(--ink-soft)]">
          A styling system for owned pieces, wishlist discipline, and outfits
          that feel intentional.
        </p>
      </section>

      {/* Stats */}
      <section className="mt-10 grid grid-cols-3 border-y border-[var(--line)]">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`py-7 text-center ${i === 1 ? "border-x border-[var(--line)]" : ""}`}
          >
            <p className="font-display text-3xl text-[var(--ink)] sm:text-[2.375rem]">
              {s.num}
            </p>
            <p className="mt-2 text-[0.625rem] uppercase tracking-[0.22em] text-[#a8927c] sm:text-[0.6875rem]">
              {s.label}
            </p>
          </div>
        ))}
      </section>

      {/* Outfit board */}
      <section className="mt-12">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl text-[var(--ink)] sm:text-[1.75rem]">
            Outfit board
          </h2>
          <span className="text-[0.6875rem] uppercase tracking-[0.16em] text-[var(--caramel)]">
            + New look
          </span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {board.map((p) => (
            <div
              key={p.name}
              className="lift flex aspect-[3/4] items-end rounded-xl p-3"
              style={{ backgroundColor: p.bg }}
            >
              <span
                className={`rounded-md px-2.5 py-1 text-[0.625rem] ${
                  p.dark
                    ? "bg-[rgba(31,22,17,0.6)] text-[var(--cream)]"
                    : "bg-[var(--paper)] text-[var(--coffee)]"
                }`}
              >
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Lower row */}
      <section className="mt-6 grid gap-5 md:grid-cols-[1.3fr_1fr]">
        <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-2)] p-7">
          <p className="text-[0.6875rem] uppercase tracking-[0.22em] text-[#a8927c]">
            Today&apos;s style win
          </p>
          <p className="font-display mt-3 text-xl leading-snug text-[var(--ink)]">
            The vest works better open.
          </p>
          <hr className="hairline my-5" />
          <p className="text-[0.875rem] leading-7 text-[var(--ink-soft)]">
            It creates a vertical line, avoids stiffness, and makes the outfit
            feel more relaxed, elegant, and expensive.
          </p>
        </div>

        <div className="rounded-[var(--radius)] bg-[var(--espresso)] p-7 text-[var(--cream)]">
          <p className="text-[0.6875rem] uppercase tracking-[0.22em] text-[var(--caramel-soft)]">
            Season palette
          </p>
          <p className="font-display mt-3 text-lg">Dark Autumn</p>
          <div className="mt-5 flex gap-2.5">
            {palette.map((c) => (
              <span
                key={c}
                className="h-7 w-7 rounded-full ring-1 ring-white/10"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
