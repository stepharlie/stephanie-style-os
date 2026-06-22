import { WishlistPriorityBoard } from "@/components/wishlist-priority-board";

export default function WishlistPage() {
  return (
    <div>
      <section className="px-6 pb-14 pt-16 text-center md:px-10 md:pb-16 md:pt-20">
        <p className="eyebrow">Shopping Discipline</p>

        <h1 className="font-display mx-auto mt-3 max-w-3xl text-5xl leading-[0.92] text-[var(--espresso)] md:text-7xl">
          Curated wishlist,
          <br />
          <span className="italic text-[var(--coffee)]">by priority.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[var(--ink-soft)] md:text-base">
          Wishlist pieces are grouped by purchase priority so the next buy is
          based on closet impact, not impulse.
        </p>
      </section>

      <WishlistPriorityBoard />
    </div>
  );
}
