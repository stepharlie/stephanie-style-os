const dashboardCards = [
  { title: "Owned Closet", value: "Separated", detail: "Pieces you already own live here only." },
  { title: "Wishlist", value: "Curated", detail: "Items under review before buying." },
  { title: "Today's Style Win", value: "Logged", detail: "Blazer vest worn open — comfortable, elegant, polished." },
  { title: "Next Build", value: "Mock Data", detail: "Create sample closet and wishlist data before Supabase." },
];

const styleRules = [
  { title: "Owned is not Wishlist", body: "A piece cannot be treated as owned until it is physically in the closet. Wishlist items need review, outfit potential, and buying justification." },
  { title: "Outfits are repeatable formulas", body: "When a combination works, it becomes a saved formula that can generate similar looks later." },
  { title: "Shopping fills real gaps", body: "Wishlist pieces should add color, versatility, tropical energy, or styling power — never duplicate what already exists." },
];

const nextActions = [
  "Create owned closet mock data.",
  "Create wishlist mock data.",
  "Add decision rules for wishlist items.",
  "Add outfit formula cards.",
];

export default function DashboardPage() {
  return (
    <div className="space-y-16">
      {/* Hero — editorial */}
      <section className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-start">
        <div>
          <p className="eyebrow">Private Wardrobe Atelier</p>
          <h1 className="font-display mt-5 text-[3.25rem] leading-[1.02] tracking-tight text-[var(--ink)]">
            Curated closet.<br />Polished outfits.
          </h1>
          <p className="mt-7 max-w-xl text-[0.9375rem] leading-7 text-[var(--ink-soft)]">
            A private styling system for owned inventory, wishlist discipline,
            outfit formulas, and shopping decisions that feel intentional.
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            {["Dark Autumn", "Warm Espresso", "Office Polish", "Tropical Color"].map((t) => (
              <span key={t} className="rounded-full border border-[var(--line)] px-4 py-2 text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--ink-soft)]">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Style win — espresso panel */}
        <aside className="rounded-[var(--radius)] bg-[var(--espresso)] p-8 text-[var(--cream)] shadow-soft">
          <p className="eyebrow">Today&apos;s Style Win</p>
          <p className="font-display mt-5 text-[1.75rem] leading-snug text-[var(--cream)]">
            The vest works better open.
          </p>
          <hr className="my-6 border-0 border-t border-[var(--line-dark)]" />
          <p className="text-[0.875rem] leading-7 text-[var(--cream-soft)]">
            It creates a vertical line, avoids stiffness, and makes the outfit
            feel more relaxed, elegant, and expensive.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["Polished", "Comfortable", "Office"].map((t) => (
              <span key={t} className="rounded-full border border-[var(--line-dark)] px-3.5 py-1.5 text-[0.625rem] uppercase tracking-[0.18em] text-[var(--cream-soft)]">
                {t}
              </span>
            ))}
          </div>
        </aside>
      </section>

      {/* Status row — hairline-separated, no boxes */}
      <section>
        <div className="grid divide-y divide-[var(--line)] border-t border-[var(--line)] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {dashboardCards.map((card, i) => (
            <article
              key={card.title}
              className={`px-0 py-7 sm:px-7 ${i !== 0 ? "lg:border-l lg:border-[var(--line)]" : ""}`}
            >
              <p className="eyebrow !text-[var(--ink-soft)] !tracking-[0.22em]">{card.title}</p>
              <p className="font-display mt-3 text-2xl text-[var(--ink)]">{card.value}</p>
              <p className="mt-2 text-[0.8125rem] leading-6 text-[var(--ink-soft)]">{card.detail}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Rules + Actions */}
      <section className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div>
          <h2 className="font-display text-2xl text-[var(--ink)]">Core Style Rules</h2>
          <div className="mt-7 space-y-7">
            {styleRules.map((r, i) => (
              <div key={r.title} className="flex gap-5">
                <span className="font-display text-lg text-[var(--gold)]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-medium text-[var(--ink)]">{r.title}</p>
                  <p className="mt-1.5 max-w-xl text-[0.875rem] leading-7 text-[var(--ink-soft)]">{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-8">
          <h2 className="font-display text-xl text-[var(--ink)]">Next Actions</h2>
          <ul className="mt-6 space-y-0 divide-y divide-[var(--line)]">
            {nextActions.map((action) => (
              <li key={action} className="flex items-start gap-3 py-3.5 text-[0.875rem] leading-6 text-[var(--ink-soft)]">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--gold)]" />
                {action}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
