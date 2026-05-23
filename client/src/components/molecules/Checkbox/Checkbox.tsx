import React, { memo } from "react";
import styles from "./Checkbox.module.css";

export type CheckboxType = "checkbox" | "radio";

export interface CheckboxProps {
  type?: CheckboxType;
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  value?: string;
  name?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
}

export const Checkbox = memo<CheckboxProps>(({
  type = "checkbox",
  label,
  checked = false,
  onChange,
  value,
  name,
  disabled = false,
  error,
  className = "",
}) => {
  const classes = [
    styles.field,
    disabled ? styles["field--disabled"] : "",
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      <label className={styles.label}>
        <span className={`${styles.control} ${styles[`control--${type}`]} ${checked ? styles["control--checked"] : ""}`}>
          <input
            type={type}
            className={styles.input}
            checked={checked}
            onChange={e => onChange?.(e.target.checked)}
            value={value}
            name={name}
            disabled={disabled}
          />
          {checked && (
            <span className={styles.icon} aria-hidden="true">
              {type === "checkbox" ? "✓" : "●"}
            </span>
          )}
        </span>
        {label && <span className={styles.text}>{label}</span>}
      </label>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export default Checkbox;
