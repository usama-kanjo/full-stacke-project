"use client";

import { useAuth } from "@/hooks/useAuth";
import styles from "./DashboardHome.module.css";

export function DashboardHome() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.subtitle}>Hoş geldiniz! İşte genel bakış.</p>
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Rol</span>
          <span className={styles.roleBadge}>
            {user?.role === "DENTIST" ? "🦷 Diş Hekimi" : "⚙️ Laboratuvar Teknisyeni"}
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Durum</span>
          <span className={styles.statValue}>✓</span>
        </div>
      </div>
    </div>
  );
}

DashboardHome.displayName = "DashboardHome";
export default DashboardHome;
