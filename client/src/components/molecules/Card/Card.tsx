import React from "react";
import styles from "./Card.module.css";

export type CardVariant = "outlined" | "elevated" | "flat";
export type CardPadding = "none" | "sm" | "md" | "lg";

export interface CardProps {
  variant?: CardVariant;
  padding?: CardPadding;
  hoverable?: boolean;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  variant = "outlined",
  padding = "md",
  hoverable = false,
  children,
  className = "",
  onClick,
}) => {
  const classes = [
    styles.card,
    styles[`card--${variant}`],
    styles[`card--pad-${padding}`],
    hoverable ? styles["card--hoverable"] : "",
    onClick ? styles["card--clickable"] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const Tag = onClick ? "button" : "div";

  return (
    <Tag className={classes} onClick={onClick} type={onClick ? "button" : undefined}>
      {children}
    </Tag>
  );
};

Card.displayName = "Card";

export default Card;
