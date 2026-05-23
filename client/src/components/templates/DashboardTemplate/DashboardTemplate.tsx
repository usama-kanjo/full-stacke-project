"use client";

import type { ReactNode } from "react";
import { Header } from "@/components/organisms/Header";
import { Sidebar } from "@/components/organisms/Sidebar";
import styles from "./DashboardTemplate.module.css";

type DashboardTemplateProps = {
  children: ReactNode;
};

export function DashboardTemplate({ children }: DashboardTemplateProps) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Header />
        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
}

DashboardTemplate.displayName = "DashboardTemplate";
export default DashboardTemplate;
