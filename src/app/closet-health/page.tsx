import { EditorialPage } from "@/components/editorial-page";

export default function ClosetHealthPage() {
  return (
    <EditorialPage
      eyebrow="Wardrobe Analysis"
      title="Closet health,"
      italicTitle="with intention."
      description="A future dashboard for duplicates, gaps, color balance, outfit coverage, and shopping priorities."
      stats={[
        { value: "90%", label: "Neutral Base" },
        { value: "5", label: "Color Gaps" },
        { value: "3", label: "Priority Buys" },
      ]}
      actionLabel="Analyze"
      features={[
        {
          title: "Gaps",
          description:
            "Identify missing colors, shoes, accessories, tropical pieces, and office outfit builders.",
        },
        {
          title: "Duplicates",
          description:
            "Flag repeated black, beige, cream, and brown basics before adding more.",
        },
        {
          title: "Priorities",
          description:
            "Turn closet gaps into a focused shopping plan instead of random wishlisting.",
        },
      ]}
    />
  );
}
