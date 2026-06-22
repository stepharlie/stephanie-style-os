import { EditorialPage } from "@/components/editorial-page";

export default function PlannerPage() {
  return (
    <EditorialPage
      eyebrow="Daily Styling"
      title="Plan the look,"
      italicTitle="before the morning."
      description="A wardrobe planner for office days, weekends, weather, color goals, and outfit repeat formulas."
      stats={[
        { value: "5", label: "Work Days" },
        { value: "2", label: "Casual Days" },
        { value: "PR", label: "Weather Context" },
      ]}
      actionLabel="+ Plan Outfit"
      features={[
        {
          title: "By occasion",
          description:
            "Plan outfits for work, errands, dinners, weekends, and tropical casual days.",
        },
        {
          title: "By weather",
          description:
            "Keep Puerto Rico heat in mind with breathable outfits that still feel polished.",
        },
        {
          title: "By formula",
          description:
            "Reuse proven outfit structures instead of starting from zero every morning.",
        },
      ]}
    />
  );
}
