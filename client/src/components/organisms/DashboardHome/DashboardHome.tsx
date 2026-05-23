"use client";

import { Icon } from "@/components/atoms/Icon";
import { useAuth } from "@/hooks/useAuth";
import styles from "./DashboardHome.module.css";

export function DashboardHome() {
  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.subtitle}>Welcome! Here's an overview.</p>
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Rol</span>
          <span className={styles.roleBadge}>
            <Icon name={user?.role === "DENTIST" ? "tooth" : "settings"} size="sm" />
            {user?.role === "DENTIST" ? "Dentist" : "Lab Technician"}
          </span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Durum</span>
          <span className={styles.statValue}><Icon name="check" size="xl" /></span>
        </div>
      </div>
    </div>
  );
}

DashboardHome.displayName = "DashboardHome";
export default DashboardHome;
