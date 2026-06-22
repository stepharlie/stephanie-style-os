import { EditorialPage } from "@/components/editorial-page";

export default function SettingsPage() {
  return (
    <EditorialPage
      eyebrow="Style Profile"
      title="Your rules,"
      italicTitle="your edit."
      description="The foundation for every outfit, wishlist decision, color choice, fit note, and shopping recommendation."
      stats={[
        { value: "DA", label: "Dark Autumn" },
        { value: "BH", label: "Bottom Hourglass" },
        { value: "PR", label: "Tropical Climate" },
      ]}
      actionLabel="Edit Profile"
      features={[
        {
          title: "Palette",
          description:
            "Warm espresso, camel, olive, burgundy, chocolate, cream, terracotta, and muted tropical color.",
        },
        {
          title: "Silhouette",
          description:
            "Bottom Hourglass styling logic with attention to waist, hips, vertical lines, and balance.",
        },
        {
          title: "Shopping rules",
          description:
            "No unnecessary duplicates. Statement pieces must add real outfit value.",
        },
      ]}
    />
  );
}
