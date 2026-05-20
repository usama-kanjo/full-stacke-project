import React from "react";
import styles from "./Badge.module.css";

type BadgeProps = {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  disabled = false,
  onClick,
}) => {
  return (
    <div
      className={`${styles.container} ${disabled ? styles.disabled : ""}`}
      onClick={onClick}
      aria-disabled={disabled}
    >
      {children}
    </div>
  );
};

export default Badge;
