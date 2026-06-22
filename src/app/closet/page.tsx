import { ClosetCategoryBoard } from "@/components/closet-category-board";

export default function ClosetPage() {
  return (
    <div>
      <section className="px-6 pb-14 pt-16 text-center md:px-10 md:pb-16 md:pt-20">
        <p className="eyebrow">Owned Wardrobe</p>

        <h1 className="font-display mx-auto mt-3 max-w-3xl text-5xl leading-[0.92] text-[var(--espresso)] md:text-7xl">
          Your closet,
          <br />
          <span className="italic text-[var(--coffee)]">clearly edited.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[var(--ink-soft)] md:text-base">
          Owned pieces only. This is the inventory you can actually style,
          repeat, and build outfits from.
        </p>
      </section>

      <ClosetCategoryBoard />
    </div>
  );
}
