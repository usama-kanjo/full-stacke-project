// ============================================================
// 📁 src/components/atoms/Button/Button.tsx
// ============================================================
// The core Atom: Button
//
// Atomic Design principle:
//   Atoms → smallest usable unit (Button, Input, Badge...)
//   Molecules → groups multiple Atoms (SearchBar = Input + Button)
//   Organisms → groups Molecules (Navbar, Form, Card)
//   Templates → page structure
//   Pages → actual page
// ============================================================

import React, { memo } from "react";
import styles from "./Button.module.css";

// ─── Types ──────────────────────────────────────────────────
// Define variants clearly via TypeScript Union Types
export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button type - determines color and overall style */
  variant?: ButtonVariant;

  /** Button size - determines padding and font-size */
  size?: ButtonSize;

  /** Loading state - disables button and shows a spinner */
  loading?: boolean;

  /** Icon before text */
  leftIcon?: React.ReactNode;

  /** Icon after text */
  rightIcon?: React.ReactNode;

  /** Makes the button fill the full width */
  fullWidth?: boolean;

  children: React.ReactNode;
}

// ─── Component ──────────────────────────────────────────────
export const Button = memo<ButtonProps>(({
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  children,
  className = "",
  ...rest
}) => {
  // Build className dynamically based on props
  const classes = [
    styles.btn,
    styles[`btn--${variant}`], // btn--primary / btn--secondary ...
    styles[`btn--${size}`], // btn--sm / btn--md / btn--lg
    fullWidth ? styles["btn--full"] : "",
    loading ? styles["btn--loading"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const isDisabled = disabled || loading;

  return (
    <button
      className={classes}
      disabled={isDisabled}
      aria-busy={loading}
      {...rest}
    >
      {/* Loading indicator */}
      {loading && <span className={styles.spinner} aria-hidden="true" />}

      {/* Left icon */}
      {!loading && leftIcon && <span className={styles.icon}>{leftIcon}</span>}

      {/* Text */}
      <span>{children}</span>

      {/* Right icon */}
      {!loading && rightIcon && (
        <span className={styles.icon}>{rightIcon}</span>
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
