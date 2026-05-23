"use client";

import { Button } from "@/components/atoms/Button";
import { useAuth } from "@/hooks/useAuth";
import styles from "./Header.module.css";

type HeaderProps = {
  onLoginClick?: () => void;
};

export function Header({ onLoginClick }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <span className={styles.logo}>KanjoLab</span>
      <div className={styles.actions}>
        {user
          ? (
              <div className={styles.userMenu}>
                <span className={styles.email}>{user.email}</span>
                <Button variant="ghost" onClick={logout}>
                  Log Out
                </Button>
              </div>
            )
          : (
              <Button variant="primary" onClick={onLoginClick}>
                Log In
              </Button>
            )}
      </div>
    </header>
  );
}

Header.displayName = "Header";
export default Header;
