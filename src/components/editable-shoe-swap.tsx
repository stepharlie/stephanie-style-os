"use client";

import { useMemo, useState } from "react";
import { GeneratedOutfitVisual } from "@/components/generated-outfit-visual";
import type { WardrobeItem } from "@/types/wardrobe";

type EditableShoeSwapProps = {
  items: WardrobeItem[];
  closetItems: WardrobeItem[];
};

export function EditableShoeSwap({ items, closetItems }: EditableShoeSwapProps) {
  const originalShoe = items.find((item) => item.category === "shoes");
  const [shoeId, setShoeId] = useState(originalShoe?.id ?? "");

  const shoes = useMemo(
    () =>
      closetItems
        .filter((item) => item.category === "shoes")
        .sort((a, b) => a.name.localeCompare(b.name)),
    [closetItems],
  );

  const visualItems = useMemo(() => {
    const selectedShoe = shoes.find((shoe) => shoe.id === shoeId);
    return items.map((item) =>
      item.category === "shoes" && selectedShoe ? selectedShoe : item,
    );
  }, [items, shoeId, shoes]);

  return (
    <div>
      <GeneratedOutfitVisual items={visualItems} />

      <details className="mb-5 rounded-[6px] border border-[var(--line)] bg-[var(--paper-2)] p-4">
        <summary className="cursor-pointer text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[var(--coffee)]">
          Edit shoes
        </summary>

        <label className="mt-4 block text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-[var(--coffee)]">
          Shoes
          <select
            value={shoeId}
            onChange={(event) => setShoeId(event.target.value)}
            className="mt-2 block w-full rounded-[4px] border border-[var(--line)] bg-[var(--paper)] px-3 py-3 text-sm normal-case tracking-normal text-[var(--espresso)]"
          >
            {shoes.map((shoe) => (
              <option key={shoe.id} value={shoe.id}>
                {shoe.name} · {shoe.colorName}
              </option>
            ))}
          </select>
        </label>
      </details>
    </div>
  );
}
