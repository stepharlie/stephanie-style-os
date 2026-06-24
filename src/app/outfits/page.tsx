import { OutfitBuilder } from "@/components/outfit-builder";
import { getWardrobeItems } from "@/lib/wardrobe/data";

export default async function OutfitsPage() {
  const items = await getWardrobeItems();

  return <OutfitBuilder items={items} />;
}
