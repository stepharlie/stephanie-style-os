import { EditorialPageHeader } from "@/components/editorial-page-header";

const logStats = [
  {
    value: "Day",
    label: "Detail view",
    note: "See the outfit need for each calendar block.",
  },
  {
    value: "Week",
    label: "Best default",
    note: "Plan outfits and avoid repeating key pieces too closely.",
  },
  {
    value: "Month",
    label: "History view",
    note: "Track what you wore and what pieces are underused.",
  },
];

export default function PlannerPage() {
  return (
    <main className="pb-16 md:pb-20">
      <EditorialPageHeader
        eyebrow="Outfit Log"
        title={
          <>
            Wear it,{" "}
            <em className="text-[var(--coffee)]">then track it.</em>
          </>
        }
        description="A calendar-based outfit log for planning looks, recording what you wore, and avoiding repeat formulas when you want variety."
        asideEyebrow="Calendar Mode"
        asideText="Day, week, and month views will live here."
      />

      <section className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          {logStats.map((stat) => (
            <article
              key={stat.value}
              className="rounded-[4px] border border-[var(--line)] bg-[var(--paper-2)] px-7 py-7"
            >
              <p className="font-display text-5xl leading-none text-[var(--espresso)]">
                {stat.value}
              </p>
              <p className="mt-5 text-[0.58rem] font-medium uppercase tracking-[0.24em] text-[var(--caramel)]">
                {stat.label}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">
                {stat.note}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[4px] border border-dashed border-[var(--line)] bg-[var(--paper-2)] p-10 text-center">
          <p className="eyebrow mb-3">Pending Build</p>
          <h2 className="font-display text-4xl text-[var(--espresso)]">
            Day / Week / Month calendar view
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">
            Next step: build the full Outfit Log calendar with switchable views,
            Apple Calendar context, planned outfits, worn outfits, and repeat
            detection.
          </p>
        </div>
      </section>
    </main>
  );
}
