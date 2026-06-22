import { EditorialPage } from "@/components/editorial-page";

export default function OutfitsPage() {
  return (
    <EditorialPage
      eyebrow="Outfit Formulas"
      title="Saved looks,"
      italicTitle="repeatable style."
      description="When an outfit feels comfortable, polished, and elegant, it becomes a formula you can recreate."
      stats={[
        { value: "12", label: "Saved Outfits" },
        { value: "4", label: "Work Looks" },
        { value: "1", label: "Style Win Today" },
      ]}
      actionLabel="+ New Look"
      features={[
        {
          title: "Formula first",
          description:
            "Save the structure of a good outfit so it can generate similar looks later.",
        },
        {
          title: "Occasion tags",
          description:
            "Separate office, casual, tropical, dinner, weekend, and Friday denim outfits.",
        },
        {
          title: "Styling notes",
          description:
            "Record what worked: worn open, tucked, belted, paired with brown, or balanced with cream.",
        },
      ]}
    />
  );
}
