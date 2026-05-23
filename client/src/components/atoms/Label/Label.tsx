import React, { memo } from "react";
import styles from "./Label.module.css";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
}

export const Label = memo<LabelProps>(({
  required = false,
  disabled = false,
  children,
  className = "",
  ...rest
}) => {
  const classes = [
    styles.label,
    disabled ? styles["label--disabled"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={classes} aria-disabled={disabled || undefined} {...rest}>
      {children}
      {required && <span className={styles.asterisk} aria-hidden="true">*</span>}
    </label>
  );
});

Label.displayName = "Label";

export default Label;
