import { mockOwnedItems } from "@/lib/mock-owned-items";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { mapWardrobeItem } from "@/lib/supabase/mappers";
import type { WardrobeItem } from "@/types/wardrobe";

export async function getWardrobeItems(): Promise<WardrobeItem[]> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return mockOwnedItems;
  }

  const { data, error } = await supabase
    .from("wardrobe_items")
    .select("*, wardrobe_item_images(*)")
    .eq("is_archived", false)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Failed to load wardrobe_items from Supabase:", error.message);
    return mockOwnedItems;
  }

  if (!data?.length) {
    return [];
  }

  return data.map((item) => mapWardrobeItem(item as never));
}
