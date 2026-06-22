const dashboardCards = [
  {
    title: "Owned Closet",
    value: "Separated",
    detail: "Pieces you already own live here only.",
  },
  {
    title: "Wishlist",
    value: "Separate",
    detail: "Items under review before buying.",
  },
  {
    title: "Today's Style Win",
    value: "Logged",
    detail: "Blazer vest worn open felt comfortable, elegant, and polished.",
  },
  {
    title: "Next Build",
    value: "Mock Data",
    detail: "Create sample closet and wishlist data before Supabase.",
  },
];

const nextActions = [
  "Create owned closet mock data.",
  "Create wishlist mock data.",
  "Add decision rules for wishlist items.",
  "Add outfit formula cards.",
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-[#eadfd4] bg-[#fffaf5] p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#9a6b4f]">
          Welcome back
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#2c211c]">
          Your wardrobe, but organized with intention.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[#765f53]">
          Closet OS starts with one clear rule: owned pieces and wishlist pieces
          stay separate. From there, the app helps identify outfit formulas,
          color gaps, duplicates, and better buying decisions.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardCards.map((card) => (
          <article
            key={card.title}
            className="rounded-3xl border border-[#eadfd4] bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-medium text-[#765f53]">{card.title}</p>
            <p className="mt-3 text-2xl font-semibold text-[#2c211c]">
              {card.value}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#765f53]">
              {card.detail}
            </p>
          </article>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-[#eadfd4] bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Core Style Rules</h2>
          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-[#f8f3ed] p-4">
              <p className="font-medium">Owned is not Wishlist</p>
              <p className="mt-1 text-sm leading-6 text-[#765f53]">
                A piece cannot be treated as owned until it is physically in the
                closet. Wishlist items need review, outfit potential, and buying
                justification.
              </p>
            </div>

            <div className="rounded-2xl bg-[#f8f3ed] p-4">
              <p className="font-medium">Outfits should be repeatable formulas</p>
              <p className="mt-1 text-sm leading-6 text-[#765f53]">
                When a combination works, it should become a saved formula that
                can generate similar looks later.
              </p>
            </div>

            <div className="rounded-2xl bg-[#f8f3ed] p-4">
              <p className="font-medium">Shopping must fill real gaps</p>
              <p className="mt-1 text-sm leading-6 text-[#765f53]">
                Wishlist pieces should add color, versatility, tropical energy,
                or styling power without duplicating what already exists.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-[#eadfd4] bg-[#3b2a22] p-6 text-[#fffaf5] shadow-sm">
          <h2 className="text-xl font-semibold">Next Actions</h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-[#f5e8dd]">
            {nextActions.map((action) => (
              <li key={action} className="rounded-2xl bg-white/10 px-4 py-3">
                {action}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
