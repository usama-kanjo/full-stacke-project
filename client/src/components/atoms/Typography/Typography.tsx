import React from "react";
import styles from "./Typography.module.css";

export type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body" | "body-sm" | "caption" | "label";

export type TypographyWeight = "light" | "regular" | "medium" | "semibold" | "bold" | "extrabold";

const variantElement: Record<TypographyVariant, React.ElementType> = {
  "h1": "h1",
  "h2": "h2",
  "h3": "h3",
  "h4": "h4",
  "h5": "h5",
  "h6": "h6",
  "body": "p",
  "body-sm": "p",
  "caption": "span",
  "label": "label",
};

export interface TypographyProps {
  variant?: TypographyVariant;
  as?: React.ElementType;
  weight?: TypographyWeight;
  children: React.ReactNode;
  className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  as,
  weight,
  children,
  className = "",
}) => {
  const Tag = as ?? variantElement[variant];

  const classes = [
    styles.base,
    styles[`variant--${variant}`],
    weight ? styles[`weight--${weight}`] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Tag className={classes}>{children}</Tag>;
};

Typography.displayName = "Typography";

export default Typography;
