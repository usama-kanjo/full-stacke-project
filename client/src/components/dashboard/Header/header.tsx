import React from 'react';
import { BellIcon, MenuIcon, GridIcon } from '../../ui/Icons';
import styles from './header.module.css';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <button
          onClick={toggleSidebar}
          className={styles.toggleButton}
          aria-label="Toggle sidebar"
        >
          <MenuIcon className={styles.icon} />
        </button>
        <div className={styles.logoContainer}>
          <div className={styles.logoIconWrapper}>
            <GridIcon className={styles.logoIcon} />
          </div>
          <div className={styles.logoTextContainer}>
            <h1 className={styles.appName}>Uygulama Adı</h1>
            <p className={styles.appSubtitle}>Kontrol Paneli</p>
          </div>
        </div>
      </div>
      <div className={styles.rightSection}>
        <button className={styles.notificationButton}>
          <BellIcon className={styles.notificationIcon} />
        </button>
        <img
          src="https://picsum.photos/id/237/200/200"
          alt="User Avatar"
          className={styles.avatar}
        />
      </div>
    </header>
  );
};

export default Header;
