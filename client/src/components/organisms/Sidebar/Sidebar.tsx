"use client";

import type { IconName } from "@/components/atoms/Icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/atoms/Icon";
import { useAuth } from "@/hooks/useAuth";
import styles from "./Sidebar.module.css";

type NavItem = {
  label: string;
  icon: IconName;
  href: string;
};

const dentistNav: NavItem[] = [
  { label: "Dashboard", icon: "grid", href: "/dashboard" },
  { label: "Orders", icon: "list", href: "/dashboard/orders" },
  { label: "New Order", icon: "plus", href: "/dashboard/orders/new" },
  { label: "Profile", icon: "user", href: "/dashboard/profile" },
  { label: "Settings", icon: "settings", href: "/dashboard/settings" },
];

const technicianNav: NavItem[] = [
  { label: "Dashboard", icon: "grid", href: "/dashboard" },
  { label: "Orders", icon: "list", href: "/dashboard/orders" },
  { label: "Profile", icon: "user", href: "/dashboard/profile" },
  { label: "Settings", icon: "settings", href: "/dashboard/settings" },
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
            <Icon name={item.icon} size="md" className={styles.navIcon} />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

Sidebar.displayName = "Sidebar";
export default Sidebar;
