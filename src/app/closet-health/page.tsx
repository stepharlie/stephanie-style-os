import Link from "next/link";
import { PageHeader } from "@/components/page-header";

const healthSignals = [
  {
    value: "Color",
    label: "Palette balance",
    note: "Track whether the closet is still too black/neutral or gaining intentional color.",
  },
  {
    value: "Use",
    label: "Wear rotation",
    note: "Spot pieces that repeat too often or are not getting styled enough.",
  },
  {
    value: "Gaps",
    label: "Closet gaps",
    note: "Identify weak categories like shoes, bags, rain-day looks, or tropical workwear.",
  },
];

export default function ClosetHealthPage() {
  return (
    <main className="pb-16 md:pb-20">
      <PageHeader
        eyebrow="Closet Health"
        title={
          <>
            What works,{" "}
            <em className="text-[var(--coffee)]">what is missing.</em>
          </>
        }
        description="A health check for your closet: color balance, outfit coverage, repeat patterns, gaps, and pieces that need more styling support."
        asideEyebrow="System Signal"
        asideText="The intelligence layer for shopping less randomly."
      >
        <div className="flex flex-wrap gap-5">
          <Link
            href="/closet"
            className="border-b-[1.5px] border-transparent pb-[3px] text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[var(--coffee)] no-underline transition hover:border-[var(--coffee)]"
          >
            Wardrobe Gallery
          </Link>
          <Link
            href="/closet-health"
            className="border-b-[1.5px] border-[var(--espresso)] pb-[3px] text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[var(--espresso)] no-underline"
          >
            Closet Health
          </Link>
        </div>
      </PageHeader>

      <section className="mx-auto max-w-6xl px-6 py-10 md:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          {healthSignals.map((signal) => (
            <article
              key={signal.label}
              className="rounded-[4px] border border-[var(--line)] bg-[var(--paper-2)] px-7 py-7"
            >
              <p className="font-display text-5xl leading-none text-[var(--espresso)]">
                {signal.value}
              </p>
              <p className="mt-5 text-[0.58rem] font-medium uppercase tracking-[0.24em] text-[var(--caramel)]">
                {signal.label}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--ink-soft)]">
                {signal.note}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-[4px] border border-dashed border-[var(--line)] bg-[var(--paper-2)] p-10 text-center">
          <p className="eyebrow mb-3">Pending Build</p>
          <h2 className="font-display text-4xl text-[var(--espresso)]">
            Closet coverage dashboard
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">
            Next step: calculate real closet gaps, underused pieces, repeat
            patterns, color balance, and weather coverage from your owned items
            and outfit log.
          </p>
        </div>
      </section>
    </main>
  );
}
