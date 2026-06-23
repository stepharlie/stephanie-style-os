"use client";

import { useMemo, useState } from "react";
import { ClosetCard } from "@/components/closet-card";
import { ClosetItemEditForm } from "@/components/closet-item-edit-form";
import type {
  ColorFamily,
  PatternType,
  WardrobeCategory,
  WardrobeItem,
} from "@/types/wardrobe";
import {
  colorFamilyOptions,
  formatLabel,
  getPatternSubtypeOptions,
  getSubcategoryOptions,
  normalizeLabel,
  patternTypeOptions,
} from "@/lib/taxonomy";

type CategoryFilter = WardrobeCategory | "all";
type ColorFamilyFilter = ColorFamily | "all";
type ClosetSort = "default" | "score-high" | "score-low" | "missing-scores";

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

const colorFamilyFilters: {
  value: ColorFamilyFilter;
  label: string;
}[] = [
  { value: "all", label: "All colors" },
  ...colorFamilyOptions.map((colorFamily) => ({
    value: colorFamily,
    label: formatLabel(colorFamily),
  })),
];

type PatternTypeFilter = PatternType | "all";
type PatternSubtypeFilter = string | "all";

const patternTypeFilters: {
  value: PatternTypeFilter;
  label: string;
}[] = [
  { value: "all", label: "All patterns" },
  ...patternTypeOptions
    .filter((option) => option.value)
    .map((option) => ({
      value: option.value as PatternType,
      label: option.label,
    })),
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


function getClosetScore(item: WardrobeItem) {
  const scores = [
    item.loveScore,
    item.versatilityScore,
    item.fitConfidenceScore,
    item.capsuleValueScore,
  ].filter((score): score is number => typeof score === "number");

  if (!scores.length) {
    return null;
  }

  const average =
    scores.reduce((total, score) => total + score, 0) / scores.length;

  return Number(average.toFixed(1));
}

function hasAnyClosetScore(item: WardrobeItem) {
  return [
    item.loveScore,
    item.versatilityScore,
    item.fitConfidenceScore,
    item.capsuleValueScore,
  ].some((score) => typeof score === "number");
}

type ClosetCategoryBoardProps = {
  items: WardrobeItem[];
};

export function ClosetCategoryBoard({ items: initialItems }: ClosetCategoryBoardProps) {
  const [items, setItems] = useState(initialItems);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [selectedColorFamily, setSelectedColorFamily] =
    useState<ColorFamilyFilter>("all");
  const [selectedColorName, setSelectedColorName] = useState("all");
  const [selectedPatternType, setSelectedPatternType] =
    useState<PatternTypeFilter>("all");
  const [selectedPatternSubtype, setSelectedPatternSubtype] =
    useState<PatternSubtypeFilter>("all");
  const [selectedSort, setSelectedSort] = useState<ClosetSort>("default");
  const [selectedItem, setSelectedItem] = useState<WardrobeItem | null>(null);
  const [savedItemName, setSavedItemName] = useState<string | null>(null);

  const availableSubcategories = useMemo(() => {
    if (selectedCategory === "all") {
      return [];
    }

    const fromItems = items
      .filter((item) => item.category === selectedCategory)
      .map((item) => item.subcategory)
      .filter((value): value is string => Boolean(value))
      .map(normalizeLabel);

    const fallback = getSubcategoryOptions(selectedCategory);

    return Array.from(new Set([...fromItems, ...fallback])).sort((a, b) =>
      a.localeCompare(b),
    );
  }, [items, selectedCategory]);

  const availablePatternSubtypes = useMemo(() => {
    if (selectedPatternType === "all") {
      return [];
    }

    const fromItems = items
      .filter((item) => item.patternType === selectedPatternType)
      .map((item) => item.patternSubtype)
      .filter((value): value is string => Boolean(value));

    const fallback = getPatternSubtypeOptions(selectedPatternType);

    return Array.from(new Set([...fromItems, ...fallback])).sort((a, b) =>
      a.localeCompare(b),
    );
  }, [items, selectedPatternType]);

  const availableColorNames = useMemo(() => {
    const filteredItems = items.filter((item) => {
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false;
      }

      if (
        selectedSubcategory !== "all" &&
        normalizeLabel(item.subcategory ?? "") !== selectedSubcategory
      ) {
        return false;
      }

      if (
        selectedColorFamily !== "all" &&
        item.colorFamily !== selectedColorFamily
      ) {
        return false;
      }

      if (
        selectedPatternType !== "all" &&
        item.patternType !== selectedPatternType
      ) {
        return false;
      }

      if (
        selectedPatternSubtype !== "all" &&
        item.patternSubtype !== selectedPatternSubtype
      ) {
        return false;
      }

      return true;
    });

    return Array.from(new Set(filteredItems.map((item) => item.colorName)))
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, [
    items,
    selectedCategory,
    selectedSubcategory,
    selectedColorFamily,
    selectedPatternType,
    selectedPatternSubtype,
  ]);

  const filteredItems = items.filter((item) => {
    if (selectedCategory !== "all" && item.category !== selectedCategory) {
      return false;
    }

    if (
      selectedSubcategory !== "all" &&
      normalizeLabel(item.subcategory ?? "") !== selectedSubcategory
    ) {
      return false;
    }

    if (
      selectedColorFamily !== "all" &&
      item.colorFamily !== selectedColorFamily
    ) {
      return false;
    }

    if (selectedColorName !== "all" && item.colorName !== selectedColorName) {
      return false;
    }

    if (
      selectedPatternType !== "all" &&
      item.patternType !== selectedPatternType
    ) {
      return false;
    }

    if (
      selectedPatternSubtype !== "all" &&
      item.patternSubtype !== selectedPatternSubtype
    ) {
      return false;
    }

    return true;
  });

  const visibleItems = [...filteredItems].sort((a, b) => {
    if (selectedSort === "missing-scores") {
      return Number(hasAnyClosetScore(a)) - Number(hasAnyClosetScore(b));
    }

    if (selectedSort === "score-high") {
      return (getClosetScore(b) ?? -1) - (getClosetScore(a) ?? -1);
    }

    if (selectedSort === "score-low") {
      return (getClosetScore(a) ?? 999) - (getClosetScore(b) ?? 999);
    }

    return 0;
  });

  const getCategoryCount = (category: CategoryFilter) => {
    if (category === "all") return items.length;

    return items.filter((item) => item.category === category).length;
  };

  const selectedFilter = categoryFilters.find(
    (filter) => filter.value === selectedCategory,
  );

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedSubcategory !== "all" ||
    selectedColorFamily !== "all" ||
    selectedColorName !== "all" ||
    selectedPatternType !== "all" ||
    selectedPatternSubtype !== "all" ||
    selectedSort !== "default";

  function handleCategoryChange(category: CategoryFilter) {
    setSelectedCategory(category);
    setSelectedSubcategory("all");
  }

  function handleColorFamilyChange(colorFamily: ColorFamilyFilter) {
    setSelectedColorFamily(colorFamily);
    setSelectedColorName("all");
  }

  function handlePatternTypeChange(patternType: PatternTypeFilter) {
    setSelectedPatternType(patternType);
    setSelectedPatternSubtype("all");
  }

  function clearFilters() {
    setSelectedCategory("all");
    setSelectedSubcategory("all");
    setSelectedColorFamily("all");
    setSelectedColorName("all");
    setSelectedPatternType("all");
    setSelectedPatternSubtype("all");
    setSelectedSort("default");
  }

  function handleItemSaved(updatedItem: WardrobeItem) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item,
      ),
    );
    setSavedItemName(updatedItem.name);
  }

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
                onClick={() => handleCategoryChange(filter.value)}
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

      <div className="mb-8 rounded-[4px] border border-[var(--line)] bg-[var(--paper-2)] p-5">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <label className="grid gap-2">
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
              Category
            </span>
            <select
              value={selectedCategory}
              onChange={(event) =>
                handleCategoryChange(event.target.value as CategoryFilter)
              }
              className="rounded-[3px] border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 text-sm text-[var(--espresso)] outline-none focus:border-[var(--coffee)]"
            >
              {categoryFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
              Type
            </span>
            <select
              value={selectedSubcategory}
              onChange={(event) => setSelectedSubcategory(event.target.value)}
              disabled={selectedCategory === "all"}
              className="rounded-[3px] border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 text-sm text-[var(--espresso)] outline-none focus:border-[var(--coffee)] disabled:opacity-45"
            >
              <option value="all">
                {selectedCategory === "all" ? "Choose category first" : "All types"}
              </option>
              {availableSubcategories.map((subcategory) => (
                <option key={subcategory} value={subcategory}>
                  {subcategory}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
              Color family
            </span>
            <select
              value={selectedColorFamily}
              onChange={(event) =>
                handleColorFamilyChange(event.target.value as ColorFamilyFilter)
              }
              className="rounded-[3px] border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 text-sm text-[var(--espresso)] outline-none focus:border-[var(--coffee)]"
            >
              {colorFamilyFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
              Color name
            </span>
            <select
              value={selectedColorName}
              onChange={(event) => setSelectedColorName(event.target.value)}
              disabled={availableColorNames.length === 0}
              className="rounded-[3px] border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 text-sm text-[var(--espresso)] outline-none focus:border-[var(--coffee)] disabled:opacity-45"
            >
              <option value="all">All color names</option>
              {availableColorNames.map((colorName) => (
                <option key={colorName} value={colorName}>
                  {colorName}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
              Pattern type
            </span>
            <select
              value={selectedPatternType}
              onChange={(event) =>
                handlePatternTypeChange(event.target.value as PatternTypeFilter)
              }
              className="rounded-[3px] border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 text-sm text-[var(--espresso)] outline-none focus:border-[var(--coffee)]"
            >
              {patternTypeFilters.map((filter) => (
                <option key={filter.value} value={filter.value}>
                  {filter.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
              Pattern subtype
            </span>
            <select
              value={selectedPatternSubtype}
              onChange={(event) => setSelectedPatternSubtype(event.target.value)}
              disabled={selectedPatternType === "all"}
              className="rounded-[3px] border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 text-sm text-[var(--espresso)] outline-none focus:border-[var(--coffee)] disabled:opacity-45"
            >
              <option value="all">
                {selectedPatternType === "all"
                  ? "Choose pattern first"
                  : "All subtypes"}
              </option>
              {availablePatternSubtypes.map((subtype) => (
                <option key={subtype} value={subtype}>
                  {subtype}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
              Sort
            </span>
            <select
              value={selectedSort}
              onChange={(event) => setSelectedSort(event.target.value as ClosetSort)}
              className="rounded-[3px] border border-[var(--line)] bg-[var(--paper)] px-3 py-2.5 text-sm text-[var(--espresso)] outline-none focus:border-[var(--coffee)]"
            >
              <option value="default">Default</option>
              <option value="score-high">Highest score</option>
              <option value="score-low">Lowest score</option>
              <option value="missing-scores">Missing scores</option>
            </select>
          </label>

        </div>

        {hasActiveFilters ? (
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--coffee)]"
          >
            Clear filters
          </button>
        ) : null}
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
            <ClosetCard key={item.id} item={item} onSelect={setSelectedItem} />
          ))}
        </div>
      ) : (
        <div className="rounded-[3px] border border-dashed border-[var(--line)] bg-[var(--paper-2)] p-10 text-center">
          <p className="font-display text-3xl text-[var(--espresso)]">
            No pieces match these filters.
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[var(--ink-soft)]">
            Clear filters or choose a broader category/color combination.
          </p>
        </div>
      )}
    
      {selectedItem ? (
        <div
          className="fixed inset-0 z-40 overflow-y-auto bg-[rgba(46,31,24,0.34)] px-4 py-8 backdrop-blur-sm md:px-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Edit ${selectedItem.name}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedItem(null);
            }
          }}
        >
          <div className="mx-auto max-w-6xl rounded-[6px] border border-[var(--line)] bg-[var(--paper)] p-4 shadow-[0_30px_100px_rgba(46,31,24,0.22)] md:p-6">
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-[var(--line)] pb-4">
              <div>
                <p className="eyebrow mb-2">Edit closet item</p>
                <h3 className="font-display text-3xl leading-none text-[var(--espresso)]">
                  {selectedItem.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="rounded-full border border-[var(--line)] px-4 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--coffee)]"
              >
                Close
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
              <aside className="rounded-[4px] border border-[var(--line)] bg-[var(--paper-2)] p-4">
                {selectedItem.imageUrl ? (
                  <div
                    className="min-h-[32rem] rounded-[3px] bg-[var(--paper)] bg-contain bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${selectedItem.imageUrl})` }}
                    aria-label={selectedItem.name}
                  />
                ) : (
                  <div className="flex min-h-[32rem] items-center justify-center rounded-[3px] bg-[var(--paper)] text-sm text-[var(--ink-soft)]">
                    No photo yet.
                  </div>
                )}

                <p className="mt-4 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
                  {selectedItem.category} · {selectedItem.colorName}
                </p>
              </aside>

              <ClosetItemEditForm
                item={selectedItem}
                onSaved={handleItemSaved}
              />
            </div>
          </div>
        </div>
      ) : null}


      {savedItemName ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(46,31,24,0.38)] px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[6px] border border-[var(--line)] bg-[var(--paper)] p-7 text-center shadow-[0_32px_100px_rgba(46,31,24,0.28)]">
            <p className="eyebrow mb-3">Saved</p>
            <h3 className="font-display text-4xl leading-none text-[var(--espresso)]">
              Changes saved successfully.
            </h3>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-6 text-[var(--ink-soft)]">
              {savedItemName} was updated in your closet.
            </p>
            <button
              type="button"
              onClick={() => {
                setSavedItemName(null);
                setSelectedItem(null);
              }}
              className="mt-7 rounded-full border border-[var(--espresso)] bg-[var(--espresso)] px-6 py-3 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white"
            >
              OK
            </button>
          </div>
        </div>
      ) : null}

</section>
  );
}
