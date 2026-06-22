import { ClosetCategoryBoard } from "@/components/closet-category-board";
import { EditorialPageHeader } from "@/components/editorial-page-header";
import { mockOwnedItems } from "@/lib/mock-owned-items";

export default function ClosetPage() {
  return (
    <>
      <EditorialPageHeader
        eyebrow="Owned Wardrobe"
        title={
          <>
            Your closet,{" "}
            <em className="text-[var(--coffee)]">clearly edited.</em>
          </>
        }
        description="Owned pieces only. This is the inventory you can actually style, repeat, and build outfits from."
        asideEyebrow="Closet Mode"
        asideText={`${String(mockOwnedItems.length).padStart(2, "0")} pieces ready to style.`}
      />

      <ClosetCategoryBoard />
    </>
  );
}
