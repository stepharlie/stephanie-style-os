"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type {
  ColorFamily,
  StyleVibe,
  WardrobeCategory,
  WardrobeItem,
} from "@/types/wardrobe";

type ClosetItemEditFormProps = {
  item: WardrobeItem;
  saved?: boolean;
  onSaved?: () => void;
  onSavedConfirmation?: () => void;
};

const categoryOptions: WardrobeCategory[] = [
  "top",
  "bottom",
  "dress",
  "outerwear",
  "shoes",
  "bag",
  "accessory",
  "jewelry",
];

const subcategoryOptionsByCategory: Record<WardrobeCategory, string[]> = {
  top: [
    "Sleeveless Top",
    "Tank",
    "Camisole",
    "Crop Top",
    "Bodysuit",
    "T-Shirt",
    "Blouse",
    "Button Down",
    "Long Sleeve Top",
    "Cardigan",
  ],
  bottom: [
    "Straight Leg Pants",
    "Wide Leg Pants",
    "Jeans",
    "Shorts",
    "Skirt",
    "Trouser",
  ],
  dress: ["Dress", "Jumpsuit", "Romper"],
  outerwear: ["Blazer", "Jacket", "Vest"],
  shoes: [
    "Loafer",
    "Mule",
    "Flat",
    "Sandal",
    "Heel",
    "Sneaker",
    "Boot",
  ],
  bag: ["Shoulder Bag", "Crossbody", "Tote", "Clutch"],
  accessory: ["Belt", "Scarf", "Sunglasses", "Hat"],
  jewelry: ["Earrings", "Necklace", "Bracelet", "Ring", "Watch"],
};

const colorFamilyOptions: ColorFamily[] = [
  "black",
  "brown",
  "cream",
  "beige",
  "white",
  "burgundy",
  "olive",
  "camel",
  "plum",
  "mustard",
  "denim",
  "blue",
  "statement",
];

const colorNameByFamily: Record<ColorFamily, string[]> = {
  black: ["Black", "Washed Black", "Black/Silver Lurex"],
  brown: [
    "Espresso",
    "Chocolate",
    "Dark Brown",
    "Brown",
    "Cognac",
    "Leopard Brown",
    "Tortoise",
    "Amber",
  ],
  cream: ["Cream", "Ivory", "Ivory/Cream", "Warm Cream"],
  beige: [
    "Beige",
    "Taupe",
    "Light Taupe",
    "Beige/Oatmeal",
    "Cream/Beige",
    "Natural",
    "Nude",
    "Sand",
    "Warm Beige",
  ],
  white: ["White", "Off White"],
  burgundy: ["Burgundy", "Wine", "Oxblood", "Deep Red", "Red", "True Red"],
  olive: [
    "Olive",
    "Dark Olive",
    "Forest Green",
    "Moss",
    "Emerald Green",
    "Deep Teal",
    "Sage Green",
    "Teal",
  ],
  camel: ["Camel", "Caramel", "Warm Tan"],
  plum: ["Plum", "Eggplant", "Mauve"],
  mustard: ["Mustard", "Golden Mustard", "Ochre", "Gold", "Champagne", "Pale Yellow"],
  denim: ["Denim", "Dark Blue Denim", "Medium Blue Denim", "Light Blue Denim"],
  blue: ["Navy", "Dark Navy", "Blue", "Light Blue", "Electric Blue", "Teal", "Petrol"],
  statement: [
    "Gold",
    "Silver",
    "Leopard",
    "Cow Print",
    "Snake Print",
    "Multicolor",
    "Print",
    "Pattern",
    "Heather Gray",
    "Light Gray",
    "Gray",
    "Charcoal",
    "Pink",
    "Blush Pink",
    "Orange",
    "Clear",
  ],
};

const clothingSizeOptions = [
  "XXS",
  "XS",
  "Small",
  "Medium",
  "Large",
  "XLarge",
  "XXLarge",
  "One Size",
];

const shoeSizeOptions = [
  "5",
  "5.5",
  "6",
  "6.5",
  "7",
  "7.5",
  "8",
  "8.5",
  "9",
  "9.5",
  "10",
];

const oneSizeOptions = ["One Size"];

const vibeOptions: StyleVibe[] = [
  "classic",
  "minimal",
  "elevated",
  "work",
  "tropical",
  "statement",
  "casual",
];

function formatLabel(value: string) {
  return value.replaceAll("-", " ");
}

function getSubcategoryOptions(category: WardrobeCategory) {
  return subcategoryOptionsByCategory[category] ?? [];
}

function getSizeOptions(category: WardrobeCategory) {
  if (category === "shoes") return shoeSizeOptions;

  if (category === "bag" || category === "accessory" || category === "jewelry") {
    return oneSizeOptions;
  }

  return clothingSizeOptions;
}

function withCurrentValue(options: string[], currentValue?: string) {
  if (!currentValue || options.includes(currentValue)) {
    return options;
  }

  return [currentValue, ...options];
}

export function ClosetItemEditForm({ item, onSaved, onSavedConfirmation }: ClosetItemEditFormProps) {
  const router = useRouter();
  const [category, setCategory] = useState<WardrobeCategory>(item.category);
  const [subcategory, setSubcategory] = useState(item.subcategory ?? "");
  const [colorFamily, setColorFamily] = useState<ColorFamily>(item.colorFamily);
  const [colorName, setColorName] = useState(item.colorName);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const subcategoryOptions = useMemo(
    () => withCurrentValue(getSubcategoryOptions(category), subcategory),
    [category, subcategory],
  );

  const sizeOptions = useMemo(
    () => withCurrentValue(getSizeOptions(category), item.size),
    [category, item.size],
  );

  const colorNameOptions = useMemo(
    () => withCurrentValue(colorNameByFamily[colorFamily], colorName),
    [colorFamily, colorName],
  );

  function handleCategoryChange(nextCategory: WardrobeCategory) {
    setCategory(nextCategory);
    const nextOptions = getSubcategoryOptions(nextCategory);

    if (!nextOptions.includes(subcategory)) {
      setSubcategory(nextOptions[0] ?? "");
    }
  }

  function handleColorFamilyChange(nextColorFamily: ColorFamily) {
    setColorFamily(nextColorFamily);
    const nextOptions = colorNameByFamily[nextColorFamily];

    if (!nextOptions.includes(colorName)) {
      setColorName(nextOptions[0]);
    }
  }

  async function handleSubmit(formData: FormData) {
    setSaveStatus("saving");
    setErrorMessage("");

    const payload = {
      name: String(formData.get("name") ?? ""),
      category: String(formData.get("category") ?? "") as WardrobeCategory,
      subcategory: String(formData.get("subcategory") ?? ""),
      colorFamily: String(formData.get("colorFamily") ?? "") as ColorFamily,
      colorName: String(formData.get("colorName") ?? ""),
      size: String(formData.get("size") ?? ""),
      brand: String(formData.get("brand") ?? ""),
      notes: String(formData.get("notes") ?? ""),
      stylingNotes: String(formData.get("stylingNotes") ?? ""),
      vibes: formData.getAll("vibes").map(String) as StyleVibe[],
    };

    const response = await fetch(`/api/closet/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = (await response.json()) as { ok?: boolean; error?: string };

    if (!response.ok || !result.ok) {
      setSaveStatus("error");
      setErrorMessage(result.error ?? "Could not save this closet item.");
      return;
    }

    router.refresh();

    if (onSaved) {
      onSaved();
      return;
    }

    setSaveStatus("saved");
  }

  function handleSavedConfirmation() {
    if (onSavedConfirmation) {
      onSavedConfirmation();
      return;
    }

    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/closet");
  }

  return (
    <section className="rounded-[4px] border border-[var(--line)] bg-[var(--paper-2)] p-7">
      <p className="eyebrow mb-3">Edit item</p>
      <h2 className="font-display text-4xl leading-none text-[var(--espresso)]">
        {item.name}
      </h2>
      <p className="mt-4 text-sm leading-7 text-[var(--ink-soft)]">
        Use this form to correct color, category, size, brand, and stylist notes.
        Later this same screen will include photo replacement and AI-assisted
        descriptions.
      </p>

      {saveStatus === "error" ? (
        <div className="mt-6 rounded-[3px] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </div>
      ) : null}

      {saveStatus === "saved" ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[rgba(46,31,24,0.38)] px-6 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-[6px] border border-[var(--line)] bg-[var(--paper)] p-7 text-center shadow-[0_32px_100px_rgba(46,31,24,0.28)]">
            <p className="eyebrow mb-3">Saved</p>
            <h3 className="font-display text-4xl leading-none text-[var(--espresso)]">
              Changes saved successfully.
            </h3>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-6 text-[var(--ink-soft)]">
              Your closet item was updated and your wardrobe data is now cleaner.
            </p>
            <button
              type="button"
              onClick={handleSavedConfirmation}
              className="mt-7 rounded-full border border-[var(--espresso)] bg-[var(--espresso)] px-6 py-3 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white"
            >
              OK
            </button>
          </div>
        </div>
      ) : null}

      <form action={handleSubmit} className="mt-8 grid gap-5">

        <label className="grid gap-2">
          <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
            Name
          </span>
          <input
            name="name"
            defaultValue={item.name}
            required
            className="rounded-[3px] border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--espresso)] outline-none focus:border-[var(--coffee)]"
          />
        </label>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
              Category
            </span>
            <select
              name="category"
              value={category}
              onChange={(event) =>
                handleCategoryChange(event.target.value as WardrobeCategory)
              }
              className="rounded-[3px] border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm capitalize text-[var(--espresso)] outline-none focus:border-[var(--coffee)]"
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {formatLabel(option)}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
              Type
            </span>
            <select
              name="subcategory"
              value={subcategory}
              onChange={(event) => setSubcategory(event.target.value)}
              className="rounded-[3px] border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--espresso)] outline-none focus:border-[var(--coffee)]"
            >
              <option value="">Not set</option>
              {subcategoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
              Size
            </span>
            <select
              name="size"
              defaultValue={item.size ?? "One Size"}
              className="rounded-[3px] border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--espresso)] outline-none focus:border-[var(--coffee)]"
            >
              <option value="">Not set</option>
              {sizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
              Color family
            </span>
            <select
              name="colorFamily"
              value={colorFamily}
              onChange={(event) =>
                handleColorFamilyChange(event.target.value as ColorFamily)
              }
              className="rounded-[3px] border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm capitalize text-[var(--espresso)] outline-none focus:border-[var(--coffee)]"
            >
              {colorFamilyOptions.map((option) => (
                <option key={option} value={option}>
                  {formatLabel(option)}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
              Color name
            </span>
            <select
              name="colorName"
              value={colorName}
              onChange={(event) => setColorName(event.target.value)}
              required
              className="rounded-[3px] border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--espresso)] outline-none focus:border-[var(--coffee)]"
            >
              {colorNameOptions.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
            Brand
          </span>
          <input
            name="brand"
            defaultValue={item.brand ?? ""}
            className="rounded-[3px] border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm text-[var(--espresso)] outline-none focus:border-[var(--coffee)]"
          />
        </label>

        <fieldset className="grid gap-3 rounded-[3px] border border-[var(--line)] bg-[var(--paper)] p-4">
          <legend className="px-2 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
            Vibes
          </legend>
          <div className="flex flex-wrap gap-3">
            {vibeOptions.map((vibe) => (
              <label
                key={vibe}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] px-3 py-2 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-[var(--coffee)]"
              >
                <input
                  type="checkbox"
                  name="vibes"
                  value={vibe}
                  defaultChecked={item.vibes.includes(vibe)}
                />
                {formatLabel(vibe)}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="grid gap-2">
          <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
            Notes
          </span>
          <textarea
            name="notes"
            defaultValue={item.notes ?? ""}
            rows={4}
            className="rounded-[3px] border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm leading-6 text-[var(--espresso)] outline-none focus:border-[var(--coffee)]"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-[var(--caramel)]">
            Stylist notes
          </span>
          <textarea
            name="stylingNotes"
            defaultValue={item.stylingNotes ?? ""}
            rows={5}
            className="rounded-[3px] border border-[var(--line)] bg-[var(--paper)] px-4 py-3 text-sm leading-6 text-[var(--espresso)] outline-none focus:border-[var(--coffee)]"
          />
        </label>

        <div className="flex flex-wrap items-center gap-3 pt-3">
          <button
            type="submit"
            className="rounded-full border border-[var(--espresso)] bg-[var(--espresso)] px-5 py-3 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white"
          >
            {saveStatus === "saving" ? "Saving..." : "Save changes"}
          </button>

          <Link
            href="/closet"
            className="rounded-full border border-[var(--line)] px-5 py-3 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--coffee)]"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
}
