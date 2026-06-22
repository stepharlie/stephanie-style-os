export type WardrobeStatus = "owned" | "wishlist";

export type WardrobeCategory =
  | "top"
  | "bottom"
  | "dress"
  | "outerwear"
  | "shoes"
  | "bag"
  | "accessory"
  | "jewelry";

export type ColorFamily =
  | "black"
  | "brown"
  | "cream"
  | "beige"
  | "white"
  | "burgundy"
  | "olive"
  | "camel"
  | "plum"
  | "mustard"
  | "denim"
  | "blue"
  | "statement";

export type StyleVibe =
  | "classic"
  | "minimal"
  | "elevated"
  | "work"
  | "tropical"
  | "statement"
  | "casual";

export type WardrobeItem = {
  id: string;
  name: string;
  status: "owned";
  category: WardrobeCategory;
  colorFamily: ColorFamily;
  colorName: string;
  size?: string;
  brand?: string;
  source?: string;
  vibes: StyleVibe[];
  notes?: string;
  stylingNotes?: string;
};

export type WishlistDecision =
  | "wishlist"
  | "consider"
  | "skip"
  | "buy-priority";

export type ClosetGap =
  | "color"
  | "silhouette"
  | "shoes"
  | "accessory"
  | "workwear"
  | "statement"
  | "tropical";

export type WishlistItem = {
  id: string;
  name: string;
  status: "wishlist";
  category: WardrobeCategory;
  colorFamily: ColorFamily;
  colorName: string;
  size?: string;
  brand?: string;
  source?: string;
  vibes: StyleVibe[];
  decision: WishlistDecision;
  duplicateRisk: "low" | "medium" | "high";
  closetGap: ClosetGap;
  priorityScore: number;
  outfitPotential: number;
  notes?: string;
};

export type OutfitFormula = {
  id: string;
  name: string;
  status: "tested" | "idea";
  occasion: "office" | "casual" | "weekend" | "dinner" | "tropical";
  vibe: StyleVibe[];
  pieces: string[];
  colorStory: string[];
  notes: string;
};
