import React, { memo } from "react";
import styles from "./Badge.module.css";

export type BadgeVariant = "primary" | "success" | "warning" | "error" | "neutral";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;

  children: React.ReactNode;
}

export const Badge = memo<BadgeProps>(({
  variant = "primary",
  size = "md",
  dot = false,
  children,
}) => {
  const classes = [
    styles.badge,
    styles[`badge--${variant}`],
    styles[`badge--${size}`],
  ].join(" ");

  return (
    <span className={classes}>
      {dot && <span className={styles.dot} aria-hidden="true" />}
      {children}
    </span>
  );
});

export default Badge;
