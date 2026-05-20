import React, { useId } from "react";
import { Label } from "@/components/atoms/Label";
import styles from "./FormField.module.css";

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  leftIcon,
  rightIcon,
  onRightIconClick,
  children,
  className = "",
}) => {
  const fieldId = useId();

  const child = React.isValidElement<{
    id?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onRightIconClick?: () => void;
  }>(children)
    ? React.cloneElement(children, {
        id: fieldId,
        error,
        leftIcon: leftIcon ?? children.props.leftIcon,
        rightIcon: rightIcon ?? children.props.rightIcon,
        onRightIconClick: onRightIconClick ?? children.props.onRightIconClick,
      })
    : children;

  return (
    <div className={`${styles.field} ${className}`}>
      {label && (
        <Label htmlFor={fieldId} required={required}>
          {label}
        </Label>
      )}
      {child}
      {error && (
        <span className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

FormField.displayName = "FormField";

export default FormField;
