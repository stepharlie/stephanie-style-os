import { EditorialPageHeader } from "@/components/editorial-page-header";

const profileStats = [
  {
    value: "DA",
    label: "Dark Autumn",
    note: "Warm, deep, muted color direction.",
  },
  {
    value: "BH",
    label: "Bottom Hourglass",
    note: "Style around waist definition and balanced proportions.",
  },
  {
    value: "PR",
    label: "Tropical Climate",
    note: "Lightweight, breathable, humidity-aware outfit logic.",
  },
];

export default function SettingsPage() {
  return (
    <main className="pb-16 md:pb-20">
      <EditorialPageHeader
        eyebrow="Style Profile"
        title={
          <>
            Your rules,{" "}
            <em className="text-[var(--coffee)]">your edit.</em>
          </>
        }
        description="The foundation for every outfit, wishlist decision, color choice, fit note, and shopping recommendation."
        asideEyebrow="Profile Signal"
        asideText="Personal style rules for the AI layer."
      />

      <section className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          {profileStats.map((stat) => (
            <article
              key={stat.label}
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

        <div className="mt-10 rounded-[4px] border border-[var(--line)] bg-[var(--paper-2)] p-10">
          <p className="eyebrow mb-3">The Edit</p>
          <h2 className="font-display text-4xl text-[var(--espresso)]">
            Profile intelligence
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">
            This page will hold your measurements, palette, closet rules,
            shopping rules, fit preferences, and AI styling instructions.
          </p>
        </div>
      </section>
    </main>
  );
}
