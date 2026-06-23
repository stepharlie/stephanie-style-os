"use client";

import { useState } from "react";
import { ClosetCard } from "@/components/closet-card";
import type { WardrobeCategory, WardrobeItem } from "@/types/wardrobe";

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

function formatCategory(category: CategoryFilter) {
  if (category === "all") return "All owned pieces";

  return category.charAt(0).toUpperCase() + category.slice(1);
}

function selectedCategoryDescription(category: CategoryFilter) {
  if (category === "all") {
    return "Every owned piece, ready for styling and outfit building.";
  }

  if (category === "outerwear") {
    return "Blazers, vests, jackets, and layering pieces that define the outfit.";
  }

  if (category === "bottom") {
    return "Pants, denim, skirts, and outfit foundations.";
  }

  if (category === "shoes") {
    return "Shoes that complete the formula and change the mood of the look.";
  }

  if (category === "bag") {
    return "Bags that add polish, function, or statement value.";
  }

  if (category === "accessory") {
    return "Belts, scarves, and styling details that make outfits feel intentional.";
  }

  if (category === "jewelry") {
    return "Jewelry and finishing details for daily styling.";
  }

  return "Pieces in this category, separated from wishlist and ready to wear.";
}

type ClosetCategoryBoardProps = {
  items: WardrobeItem[];
};

export function ClosetCategoryBoard({ items }: ClosetCategoryBoardProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("all");

  const getCategoryCount = (category: CategoryFilter) => {
    if (category === "all") return items.length;

    return items.filter((item) => item.category === category).length;
  };

  const visibleItems =
    selectedCategory === "all"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const selectedFilter = categoryFilters.find(
    (filter) => filter.value === selectedCategory,
  );

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-10 md:px-10 md:pb-20 md:pt-12">
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow mb-3">Owned Wardrobe</p>
          <h2 className="font-display text-5xl leading-none text-[var(--espresso)]">
            Closet edit
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--ink-soft)]">
            Browse what you already own as a private wardrobe gallery, not a
            shopping list.
          </p>
        </div>

        <button className="w-fit text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--coffee)]">
          + Add Piece
        </button>
      </div>

      <div className="mb-10 border-y border-[var(--line)] py-5">
        <div className="flex flex-wrap items-baseline gap-x-9 gap-y-4">
          {categoryFilters.map((filter) => {
            const isActive = selectedCategory === filter.value;
            const count = getCategoryCount(filter.value);
            const isEmpty = count === 0;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setSelectedCategory(filter.value)}
                aria-label={`${filter.label}: ${count} pieces`}
                className={[
                  "group text-left transition",
                  isEmpty && !isActive ? "opacity-35 hover:opacity-70" : "",
                ].join(" ")}
              >
                <span
                  className={[
                    "font-display text-[1.55rem] leading-none transition",
                    isActive
                      ? "italic text-[var(--espresso)]"
                      : "text-[var(--caramel-soft)] group-hover:text-[var(--espresso)]",
                  ].join(" ")}
                >
                  {filter.label}
                  <sup
                    className={[
                      "ml-1.5 align-super text-[0.8rem] font-semibold leading-none not-italic transition",
                      isActive
                        ? "text-[var(--espresso)]"
                        : "text-[var(--caramel-soft)] group-hover:text-[var(--espresso)]",
                    ].join(" ")}
                  >
                    {count}
                  </sup>
                </span>

                <span
                  className={[
                    "mt-2 block h-px transition",
                    isActive
                      ? "w-full bg-[var(--espresso)]"
                      : "w-0 bg-[var(--caramel)] group-hover:w-full",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6 border-t border-[var(--line)] pt-7">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--caramel)]">
          {formatCategory(selectedCategory)}
        </p>

        <h3 className="font-display mt-3 text-4xl text-[var(--espresso)]">
          {selectedFilter?.label ?? "Closet"}
        </h3>

        <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--ink-soft)]">
          {selectedCategoryDescription(selectedCategory)}
        </p>

        <p className="mt-4 text-[0.62rem] font-medium uppercase tracking-[0.28em] text-[var(--caramel)]">
          {String(visibleItems.length).padStart(2, "0")} pieces
        </p>
      </div>

      {visibleItems.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleItems.map((item) => (
            <ClosetCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-[3px] border border-dashed border-[var(--line)] bg-[var(--paper-2)] p-10 text-center">
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
