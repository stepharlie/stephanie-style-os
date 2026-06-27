"use client";

import { useEffect, useMemo, useState } from "react";
import { GeneratedOutfitVisual } from "@/components/generated-outfit-visual";
import type { WardrobeItem } from "@/types/wardrobe";

type LookMetadata = {
  title?: string;
  sourceOutfitId?: string;
  formula?: string;
  decision?: string;
  generatedPieceIds?: string[];
  scores?: Record<string, unknown>;
  stylingInstruction?: string;
  whyItWorks?: string[];
};

type OutfitEditorProps = {
  items: WardrobeItem[];
  closetItems: WardrobeItem[];
  lookMetadata?: LookMetadata;
};

type SlotId =
  | "outerwear"
  | "dress"
  | "top"
  | "bottom"
  | "shoes"
  | "bag"
  | "belt"
  | "jewelry"
  | "accessory";

type SlotConfig = {
  id: SlotId;
  label: string;
  optional?: boolean;
  filter: (item: WardrobeItem) => boolean;
};

const slots: SlotConfig[] = [
  { id: "outerwear", label: "Layer", optional: true, filter: (item) => item.category === "outerwear" },
  { id: "dress", label: "Dress / Jumpsuit", optional: true, filter: (item) => item.category === "dress" },
  { id: "top", label: "Top", optional: true, filter: (item) => item.category === "top" },
  { id: "bottom", label: "Bottom", optional: true, filter: (item) => item.category === "bottom" },
  { id: "shoes", label: "Shoes", optional: true, filter: (item) => item.category === "shoes" },
  { id: "bag", label: "Bag", optional: true, filter: (item) => item.category === "bag" },
  {
    id: "belt",
    label: "Belt",
    optional: true,
    filter: (item) =>
      item.category === "accessory" &&
      `${item.name} ${item.subcategory ?? ""}`.toLowerCase().includes("belt"),
  },
  { id: "jewelry", label: "Jewelry", optional: true, filter: (item) => item.category === "jewelry" },
  {
    id: "accessory",
    label: "Accessory",
    optional: true,
    filter: (item) =>
      item.category === "accessory" &&
      !`${item.name} ${item.subcategory ?? ""}`.toLowerCase().includes("belt"),
  },
];

function getSlotForItem(item: WardrobeItem): SlotId | null {
  if (item.category === "accessory") {
    const text = `${item.name} ${item.subcategory ?? ""}`.toLowerCase();
    return text.includes("belt") ? "belt" : "accessory";
  }

  if (
    item.category === "outerwear" ||
    item.category === "dress" ||
    item.category === "top" ||
    item.category === "bottom" ||
    item.category === "shoes" ||
    item.category === "bag" ||
    item.category === "jewelry"
  ) {
    return item.category;
  }

  return null;
}

function buildGeneratedSelection(items: WardrobeItem[]) {
  const selection: Partial<Record<SlotId, string>> = {};

  for (const item of items) {
    const slot = getSlotForItem(item);
    if (!slot) continue;
    if (!selection[slot]) selection[slot] = item.id;
  }

  return selection;
}

function sortForDropdown(items: WardrobeItem[]) {
  return [...items].sort((a, b) => {
    const scoreA =
      (a.loveScore ?? 0) +
      (a.versatilityScore ?? 0) +
      (a.fitConfidenceScore ?? 0) +
      (a.capsuleValueScore ?? 0);

    const scoreB =
      (b.loveScore ?? 0) +
      (b.versatilityScore ?? 0) +
      (b.fitConfidenceScore ?? 0) +
      (b.capsuleValueScore ?? 0);

    if (scoreA !== scoreB) return scoreB - scoreA;
    return a.name.localeCompare(b.name);
  });
}

export function OutfitEditor({ items, closetItems, lookMetadata }: OutfitEditorProps) {
  const storageKey = useMemo(
    () => `the-edit-outfit-edit:${items.map((item) => item.id).sort().join("|")}`,
    [items],
  );

  const generatedSelection = useMemo(() => buildGeneratedSelection(items), [items]);

  const [selection, setSelection] =
    useState<Partial<Record<SlotId, string>>>(generatedSelection);

  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "reset" | "error">("idle");
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (!saved) {
        setSelection(generatedSelection);
        return;
      }

      const parsed = JSON.parse(saved) as Partial<Record<SlotId, string>>;
      setSelection({ ...generatedSelection, ...parsed });
    } catch {
      setSelection(generatedSelection);
    }
  }, [generatedSelection, storageKey]);

  const editedItems = useMemo(() => {
    return slots
      .map((slot) => {
        const itemId = selection[slot.id];
        return itemId ? closetItems.find((item) => item.id === itemId) : undefined;
      })
      .filter((item): item is WardrobeItem => Boolean(item));
  }, [closetItems, selection]);

  const editedPieceText = editedItems.map((item) => item.name).join(" + ");

  async function saveChanges() {
    const selectedPieces = editedItems.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      colorFamily: item.colorFamily,
      colorName: item.colorName,
      imagePath: item.imagePath ?? null,
      imageUrl: null,
    }));

    const fallbackTitle =
      editedItems
        .filter((item) => ["outerwear", "dress", "top", "bottom"].includes(item.category))
        .map((item) => item.name)
        .slice(0, 3)
        .join(" + ") || "Saved outfit";

    try {
      localStorage.setItem(storageKey, JSON.stringify(selection));
      setSaveStatus("saving");
      setSaveError(null);

      const response = await fetch("/api/outfits/saved", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: lookMetadata?.title ?? fallbackTitle,
          status: "saved",
          source: "generated",
          sourceOutfitId: lookMetadata?.sourceOutfitId ?? items.map((item) => item.id).sort().join("|"),
          formula: lookMetadata?.formula,
          decision: lookMetadata?.decision,
          generatedPieceIds: lookMetadata?.generatedPieceIds ?? items.map((item) => item.id),
          editedPieceIds: editedItems.map((item) => item.id),
          selectedPieces,
          scores: lookMetadata?.scores ?? {},
          stylingInstruction: lookMetadata?.stylingInstruction,
          whyItWorks: lookMetadata?.whyItWorks ?? [],
          notes: "Saved from generated outfit editor.",
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? "Could not save outfit.");
      }

      setSaveStatus("saved");
    } catch (error) {
      setSaveStatus("error");
      setSaveError(error instanceof Error ? error.message : "Could not save outfit.");
    }
  }

  function resetChanges() {
    localStorage.removeItem(storageKey);
    setSelection(generatedSelection);
    setSaveStatus("reset");
    setSaveError(null);
  }

  return (
    <div>
      <GeneratedOutfitVisual items={editedItems} />

      <div className="mb-5 rounded-[6px] border border-[var(--line)] bg-[var(--paper-2)] p-4">
        <details>
          <summary className="cursor-pointer text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[var(--coffee)]">
            Edit look
          </summary>

          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {slots.map((slot) => {
              const options = sortForDropdown(closetItems.filter(slot.filter));
              if (options.length === 0) return null;

              return (
                <label
                  key={slot.id}
                  className="block text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-[var(--coffee)]"
                >
                  {slot.label}
                  <select
                    value={selection[slot.id] ?? ""}
                    onChange={(event) => {
                      const value = event.target.value;
                      setSelection((current) => ({
                        ...current,
                        [slot.id]: value || undefined,
                      }));
                      setSaveStatus("idle");
                      setSaveError(null);
                    }}
                    className="mt-2 block w-full rounded-[4px] border border-[var(--line)] bg-[var(--paper)] px-3 py-3 text-sm normal-case tracking-normal text-[var(--espresso)]"
                  >
                    {slot.optional ? <option value="">None</option> : null}
                    {options.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name} · {item.colorName}
                      </option>
                    ))}
                  </select>
                </label>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={saveChanges}
              className="rounded-full border border-[var(--espresso)] px-4 py-2 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[var(--espresso)]"
            >
              {saveStatus === "saving" ? "Saving..." : "Save changes"}
            </button>

            <button
              type="button"
              onClick={resetChanges}
              className="rounded-full border border-[var(--line)] px-4 py-2 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[var(--coffee)]"
            >
              Reset to generated
            </button>

            {saveStatus !== "idle" ? (
              <span className="rounded-full border border-[rgba(88,119,74,0.28)] bg-[rgba(88,119,74,0.10)] px-4 py-2 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-[var(--espresso)]">
                {saveStatus === "saving"
                  ? "Saving"
                  : saveStatus === "saved"
                    ? "Saved to Supabase"
                    : saveStatus === "error"
                      ? "Save failed"
                      : "Reset"}
              </span>
            ) : null}
          </div>

          {saveError ? (
            <p className="mt-3 text-xs leading-5 text-[var(--rust)]">
              {saveError}
            </p>
          ) : null}
        </details>

        <div className="mt-4 rounded-[4px] border border-[var(--line)] bg-[var(--paper)] p-4">
          <p className="text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-[var(--caramel)]">
            Current edited pieces
          </p>
          <p className="mt-2 text-sm leading-6 text-[var(--ink-soft)]">
            {editedPieceText || "No pieces selected."}
          </p>
        </div>
      </div>
    </div>
  );
}
