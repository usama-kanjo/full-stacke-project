import React, { forwardRef } from "react";
import styles from "./Input.module.css";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = "md",
      error,
      leftIcon,
      rightIcon,
      onRightIconClick,
      fullWidth = false,
      disabled,
      className = "",
      ...rest
    },
    ref,
  ) => {
    const classes = [
      styles.input,
      styles[`input--${size}`],
      error ? styles["input--error"] : "",
      fullWidth ? styles["input--full"] : "",
      disabled ? styles["input--disabled"] : "",
      leftIcon ? styles["input--hasLeftIcon"] : "",
      rightIcon ? styles["input--hasRightIcon"] : "",
      onRightIconClick ? styles["input--clickableRightIcon"] : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={`${styles.wrapper} ${fullWidth ? styles["wrapper--full"] : ""}`}>
        {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
        <input
          ref={ref}
          className={classes}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? "input-error" : undefined}
          {...rest}
        />
        {rightIcon && onRightIconClick
          ? (
              <button
                type="button"
                className={styles.rightIconBtn}
                onClick={onRightIconClick}
                tabIndex={-1}
                aria-label="Toggle"
              >
                {rightIcon}
              </button>
            )
          : (
              rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>
            )}
        {error && (
          <span id="input-error" className={styles.errorText} role="alert">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
