import React, { memo } from "react";
import styles from "./Spinner.module.css";

export type SpinnerSize = "sm" | "md" | "lg";

export interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

export const Spinner = memo<SpinnerProps>(({
  size = "md",
  className = "",
}) => {
  const classes = [styles.spinner, styles[`spinner--${size}`], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      className={classes}
      role="status"
      aria-label="Loading"
    >
      <span className={styles.srOnly}>Loading...</span>
    </span>
  );
});

Spinner.displayName = "Spinner";

export default Spinner;
