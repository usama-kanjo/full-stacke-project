import type { IconName } from "./icons";
import React from "react";
import styles from "./Icon.module.css";
import { icons } from "./icons";

export type IconSize = "sm" | "md" | "lg" | "xl";

export interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = "md",
  className = "",
}) => {
  const IconComponent = icons[name];
  const classes = [styles.icon, styles[`icon--${size}`], className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} aria-hidden="true">
      <IconComponent />
    </span>
  );
};

Icon.displayName = "Icon";

export default Icon;
