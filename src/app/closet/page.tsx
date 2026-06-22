import { EditorialPage } from "@/components/editorial-page";

export default function ClosetPage() {
  return (
    <EditorialPage
      eyebrow="Owned Wardrobe"
      title="Your closet,"
      italicTitle="clearly edited."
      description="Owned pieces only. This is the inventory you can actually style, repeat, and build outfits from."
      stats={[
        { value: "48", label: "Owned Pieces" },
        { value: "6", label: "Categories" },
        { value: "1", label: "Outerwear Gap" },
      ]}
      actionLabel="+ Add Piece"
      features={[
        {
          title: "Owned only",
          description:
            "Wishlist items never appear here until they are purchased and physically in the closet.",
        },
        {
          title: "Color balance",
          description:
            "Track neutrals, warm browns, creams, denim, and intentional Dark Autumn color additions.",
        },
        {
          title: "Fit notes",
          description:
            "Save styling observations like blazer vests working better open or pants needing a belt.",
        },
      ]}
    />
  );
}
