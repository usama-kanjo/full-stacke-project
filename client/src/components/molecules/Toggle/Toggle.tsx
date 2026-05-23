import React from "react";
import styles from "./Toggle.module.css";

export interface ToggleProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  size = "md",
  className = "",
}) => {
  const classes = [
    styles.field,
    disabled ? styles["field--disabled"] : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <label className={classes}>
      <span className={`${styles.track} ${styles[`track--${size}`]} ${checked ? styles["track--on"] : ""}`}>
        <input
          type="checkbox"
          className={styles.input}
          checked={checked}
          onChange={e => onChange?.(e.target.checked)}
          disabled={disabled}
          role="switch"
          aria-checked={checked}
        />
        <span className={`${styles.thumb} ${styles[`thumb--${size}`]} ${checked ? styles["thumb--on"] : ""}`} />
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
};

Toggle.displayName = "Toggle";

export default Toggle;
