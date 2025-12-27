'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, ProfileIcon, FolderIcon, MessageIcon, SettingsIconeeee } from '../../ui/Icons';
import styles from './sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  href: string;
}> = ({ icon, label, isOpen, href }) => {
  const pathname = usePathname();

  // Aktif sayfa kontrolü - nested route'lar için
  const isActive = pathname === href ||
    (href !== '/dashboard' && pathname.startsWith(href));

  const linkClasses = [
    styles.navItemLink,
    isActive ? styles.active : styles.inactive,
    !isOpen ? styles.closed : ''
  ].join(' ');

  const labelClasses = [
    styles.navItemLabel,
    isOpen ? styles.navItemLabelOpen : styles.navItemLabelClosed
  ].join(' ');

  return (
    <li>
      <Link href={href} className={linkClasses}>
        {icon}
        <span className={labelClasses}>
          {label}
        </span>
      </Link>
    </li>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const sidebarClasses = [
    styles.sidebar,
    isOpen ? styles.sidebarOpen : styles.sidebarClosed
  ].join(' ');

  return (
    <aside className={sidebarClasses}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <NavItem
            icon={<HomeIcon className={styles.navItemIcon} />}
            label="Ana Sayfa"
            href="/dashboard"
            isOpen={isOpen}
          />
          <NavItem
            icon={<ProfileIcon className={styles.navItemIcon} />}
            label="Profil"
            href="/dashboard/profile"
            isOpen={isOpen}
          />
          <NavItem
            icon={<FolderIcon className={styles.navItemIcon} />}
            label="Projeler"
            href="/dashboard/projects"
            isOpen={isOpen}
          />
          <NavItem
            icon={<MessageIcon className={styles.navItemIcon} />}
            label="Mesajlar"
            href="/dashboard/messages"
            isOpen={isOpen}
          />
          <NavItem
            icon={<SettingsIconeeee className={styles.navItemIcon} />}
            label="Ayarlar"
            href="/dashboard/settings"
            isOpen={isOpen}
          />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
