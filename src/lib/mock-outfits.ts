import type { OutfitFormula } from "@/types/wardrobe";

export const mockOutfits: OutfitFormula[] = [
  {
    id: "outfit-001",
    name: "Open Blazer Vest Office Formula",
    status: "tested",
    occasion: "office",
    vibe: ["classic", "elevated", "work"],
    pieces: ["Warm Brown Blazer Vest", "Brown Wide Leg Pants", "Cream or neutral top"],
    colorStory: ["warm brown", "cream", "espresso"],
    notes:
      "Wearing the vest open felt comfortable, elegant, polished, and office-ready.",
  },
  {
    id: "outfit-002",
    name: "Friday Dark Denim Formula",
    status: "idea",
    occasion: "office",
    vibe: ["classic", "casual", "work"],
    pieces: ["Dark Denim Straight Leg Jeans", "Blazer", "Elevated top"],
    colorStory: ["dark denim", "brown", "cream"],
    notes:
      "Good base for Friday/Saturday work outfits when denim is allowed.",
  },
  {
    id: "outfit-003",
    name: "Warm Neutral Work Formula",
    status: "idea",
    occasion: "office",
    vibe: ["minimal", "classic", "elevated"],
    pieces: ["Brown Wide Leg Pants", "Neutral top", "Camel or beige blazer"],
    colorStory: ["brown", "camel", "cream"],
    notes:
      "A repeatable polished work formula using warm neutrals.",
  },
];
