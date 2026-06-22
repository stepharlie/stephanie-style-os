"use client";

import { useState } from "react";
import type { ColorFamily, WardrobeCategory } from "@/types/wardrobe";
import { mockOwnedItems } from "@/lib/mock-owned-items";

type CategoryFilter = WardrobeCategory | "all";

const categoryFilters: {
  value: CategoryFilter;
  label: string;
  description: string;
}[] = [
  {
    value: "all",
    label: "All",
    description: "Full owned closet",
  },
  {
    value: "outerwear",
    label: "Outerwear",
    description: "Blazers, vests, jackets",
  },
  {
    value: "top",
    label: "Tops",
    description: "Shirts, tanks, camisoles",
  },
  {
    value: "bottom",
    label: "Bottoms",
    description: "Pants, denim, skirts",
  },
  {
    value: "dress",
    label: "Dresses",
    description: "Dresses and jumpsuits",
  },
  {
    value: "shoes",
    label: "Shoes",
    description: "Loafers, sandals, heels",
  },
  {
    value: "bag",
    label: "Bags",
    description: "Work and statement bags",
  },
  {
    value: "accessory",
    label: "Accessories",
    description: "Belts, scarves, styling extras",
  },
  {
    value: "jewelry",
    label: "Jewelry",
    description: "Earrings, bracelets, rings",
  },
];

const imageToneByColor: Record<ColorFamily, string> = {
  black: "bg-[#241711]",
  brown: "bg-[#94714d]",
  cream: "bg-[#eadcc8]",
  beige: "bg-[#d9c6a9]",
  white: "bg-[#f8f1e8]",
  burgundy: "bg-[#6b2f2a]",
  olive: "bg-[#6f6b43]",
  camel: "bg-[#c4aa84]",
  plum: "bg-[#5d3f4d]",
  mustard: "bg-[#b58a3f]",
  denim: "bg-[#35485e]",
  blue: "bg-[#3f5f7f]",
  statement: "bg-[#c7a2a0]",
};

function getCategoryCount(category: CategoryFilter) {
  if (category === "all") return mockOwnedItems.length;

  return mockOwnedItems.filter((item) => item.category === category).length;
}

function formatCategory(category: CategoryFilter) {
  if (category === "all") return "All owned pieces";

  return category.charAt(0).toUpperCase() + category.slice(1);
}

export function ClosetCategoryBoard() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("all");

  const visibleItems =
    selectedCategory === "all"
      ? mockOwnedItems
      : mockOwnedItems.filter((item) => item.category === selectedCategory);

  const selectedFilter = categoryFilters.find(
    (filter) => filter.value === selectedCategory,
  );

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 md:px-10 md:pb-20">
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-display text-4xl text-[var(--espresso)]">
            Owned pieces
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-7 text-[var(--ink-soft)]">
            Browse your closet by category so outfit planning starts from what
            you actually own.
          </p>
        </div>

        <button className="w-fit text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--caramel)]">
          + Add Piece
        </button>
      </div>

      <div className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {categoryFilters.map((filter) => {
          const isActive = selectedCategory === filter.value;
          const count = getCategoryCount(filter.value);

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setSelectedCategory(filter.value)}
              className={[
                "lift rounded-xl border p-4 text-left transition",
                isActive
                  ? "border-[var(--espresso)] bg-[var(--espresso)] text-[var(--paper-2)]"
                  : "border-[var(--line)] bg-[var(--paper-2)] text-[var(--espresso)]",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className={[
                      "text-[0.62rem] font-medium uppercase tracking-[0.24em]",
                      isActive
                        ? "text-[var(--caramel-soft)]"
                        : "text-[var(--caramel)]",
                    ].join(" ")}
                  >
                    {filter.label}
                  </p>
                  <p
                    className={[
                      "mt-2 text-sm leading-5",
                      isActive ? "text-[var(--cream)]" : "text-[var(--ink-soft)]",
                    ].join(" ")}
                  >
                    {filter.description}
                  </p>
                </div>

                <span
                  className={[
                    "font-display text-3xl leading-none",
                    isActive ? "text-[var(--paper-2)]" : "text-[var(--espresso)]",
                  ].join(" ")}
                >
                  {count}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mb-6 flex items-center justify-between gap-4 border-t border-[var(--line)] pt-6">
        <div>
          <p className="eyebrow">{formatCategory(selectedCategory)}</p>
          <h3 className="font-display mt-2 text-4xl text-[var(--espresso)]">
            {selectedFilter?.label ?? "Closet"}
          </h3>
        </div>

        <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--caramel)]">
          {visibleItems.length} pieces
        </p>
      </div>

      {visibleItems.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visibleItems.map((item) => (
            <article
              key={item.id}
              className="lift overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--paper-2)] shadow-soft"
            >
              <div
                className={`image-frame h-72 ${imageToneByColor[item.colorFamily]}`}
              >
                <button type="button" className="image-action">
                  {item.imageUrl ? "Edit image" : "+ Image"}
                </button>
                <span className="image-placeholder-label">Image space</span>
              </div>

              <div className="p-6">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--caramel)]">
                      {item.category}
                    </p>
                    <h3 className="font-display mt-3 text-3xl leading-tight text-[var(--espresso)]">
                      {item.name}
                    </h3>
                  </div>

                  <span className="rounded-full border border-[var(--line)] px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--coffee)]">
                    Owned
                  </span>
                </div>

                <div className="space-y-3 text-sm text-[var(--ink-soft)]">
                  <div className="flex justify-between gap-4 border-t border-[var(--line)] pt-3">
                    <span>Color</span>
                    <span className="text-[var(--espresso)]">
                      {item.colorName}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4 border-t border-[var(--line)] pt-3">
                    <span>Size</span>
                    <span className="text-[var(--espresso)]">
                      {item.size ?? "—"}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.vibes.map((vibe) => (
                    <span
                      key={vibe}
                      className="rounded-full bg-[var(--cream)] px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--coffee)]"
                    >
                      {vibe}
                    </span>
                  ))}
                </div>

                {item.notes ? (
                  <p className="mt-5 text-sm leading-7 text-[var(--ink-soft)]">
                    {item.notes}
                  </p>
                ) : null}

                {item.stylingNotes ? (
                  <p className="mt-4 border-l border-[var(--caramel)] pl-4 text-sm italic leading-7 text-[var(--coffee)]">
                    {item.stylingNotes}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[var(--line)] bg-[var(--paper-2)] p-10 text-center">
          <p className="font-display text-3xl text-[var(--espresso)]">
            No pieces here yet.
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[var(--ink-soft)]">
            This category is empty for now. When you add pieces, they will live
            here and stay separate from wishlist.
          </p>
        </div>
      )}
    </section>
  );
}
