import React, { useEffect, useState } from "react";
import styles from "./Toast.module.css";

export type ToastVariant = "success" | "error" | "warning" | "info";

export interface ToastProps {
  variant?: ToastVariant;
  message: string;
  description?: string;
  onClose?: () => void;
  autoDismiss?: number;
  className?: string;
}

export const Toast: React.FC<ToastProps> = ({
  variant = "info",
  message,
  description,
  onClose,
  autoDismiss,
  className = "",
}) => {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 200);
  };

  useEffect(() => {
    if (autoDismiss && autoDismiss > 0) {
      const timer = setTimeout(handleClose, autoDismiss);
      return () => clearTimeout(timer);
    }
  }, [autoDismiss]);

  if (!visible) {
    return null;
  }

  const classes = [
    styles.toast,
    styles[`toast--${variant}`],
    exiting ? styles["toast--exit"] : styles["toast--enter"],
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className={classes} role="alert">
      <div className={styles.content}>
        <span className={styles.message}>{message}</span>
        {description && <span className={styles.description}>{description}</span>}
      </div>
      <button
        type="button"
        className={styles.close}
        onClick={handleClose}
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
};

Toast.displayName = "Toast";

export default Toast;
