import React, { useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.css";

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  label,
  error,
  disabled = false,
  fullWidth = false,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === value);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const classes = [
    styles.wrapper,
    fullWidth ? styles["wrapper--full"] : "",
    className,
  ].filter(Boolean).join(" ");

  const triggerClasses = [
    styles.trigger,
    open ? styles["trigger--open"] : "",
    error ? styles["trigger--error"] : "",
    disabled ? styles["trigger--disabled"] : "",
  ].filter(Boolean).join(" ");

  return (
    <div className={classes} ref={ref}>
      {label && <label className={styles.label}>{label}</label>}
      <button
        type="button"
        className={triggerClasses}
        onClick={() => !disabled && setOpen(!open)}
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className={`${styles.value} ${!selectedOption ? styles["value--placeholder"] : ""}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`${styles.arrow} ${open ? styles["arrow--up"] : ""}`}>
          ▼
        </span>
      </button>
      {open && (
        <ul className={styles.menu} role="listbox">
          {options.map(option => (
            <li
              key={option.value}
              role="option"
              aria-selected={value === option.value}
              className={`${styles.option} ${value === option.value ? styles["option--selected"] : ""} ${option.disabled ? styles["option--disabled"] : ""}`}
              onClick={() => {
                if (!option.disabled) {
                  onChange?.(option.value);
                  setOpen(false);
                }
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

Dropdown.displayName = "Dropdown";

export default Dropdown;
