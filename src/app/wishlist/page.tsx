import { EditorialPage } from "@/components/editorial-page";

export default function WishlistPage() {
  return (
    <EditorialPage
      eyebrow="Shopping Discipline"
      title="Curated wishlist,"
      italicTitle="not impulse buys."
      description="Every potential piece needs a reason, a styling purpose, and a clear role before it becomes part of the closet."
      stats={[
        { value: "9", label: "Wishlist" },
        { value: "3", label: "Priority" },
        { value: "2", label: "Statement" },
      ]}
      actionLabel="+ Review Item"
      features={[
        {
          title: "No duplicates",
          description:
            "A piece must be checked against what already exists before it earns a place on the wishlist.",
        },
        {
          title: "Outfit potential",
          description:
            "Wishlist pieces should combine with enough owned items to justify buying.",
        },
        {
          title: "Color strategy",
          description:
            "Prioritize warm, rich, tropical, and Dark Autumn-friendly colors that expand the closet.",
        },
      ]}
    />
  );
}
