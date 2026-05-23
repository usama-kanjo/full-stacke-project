import type { ReactNode } from "react";
import { DashboardTemplate } from "@/components/templates/DashboardTemplate";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DashboardTemplate>{children}</DashboardTemplate>;
}
