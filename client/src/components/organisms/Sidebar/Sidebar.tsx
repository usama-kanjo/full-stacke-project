"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import styles from "./Sidebar.module.css";

type NavItem = {
  label: string;
  icon: string;
  href: string;
};

const dentistNav: NavItem[] = [
  { label: "Dashboard", icon: "📊", href: "/dashboard" },
  { label: "Siparişler", icon: "📋", href: "/dashboard/orders" },
  { label: "Yeni Sipariş", icon: "➕", href: "/dashboard/orders/new" },
  { label: "Profil", icon: "👤", href: "/dashboard/profile" },
];

const technicianNav: NavItem[] = [
  { label: "Dashboard", icon: "📊", href: "/dashboard" },
  { label: "Siparişler", icon: "📋", href: "/dashboard/orders" },
  { label: "Profil", icon: "👤", href: "/dashboard/profile" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const navItems = user?.role === "DENTIST" ? dentistNav : technicianNav;

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navItem} ${pathname === item.href ? styles["navItem--active"] : ""}`}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

Sidebar.displayName = "Sidebar";
export default Sidebar;
