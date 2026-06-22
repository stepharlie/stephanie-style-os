import type { ReactNode } from "react";
import { PageHeader } from "@/components/page-header";

type EditorialPageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  asideEyebrow?: string;
  asideText?: string;
  children?: ReactNode;
};

export function EditorialPageHeader(props: EditorialPageHeaderProps) {
  return <PageHeader {...props} />;
}
