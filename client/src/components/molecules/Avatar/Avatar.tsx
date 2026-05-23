import React, { memo, useState } from "react";
import styles from "./Avatar.module.css";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
  src?: string;
  alt: string;
  size?: AvatarSize;
  fallback?: string;
  className?: string;
}

export const Avatar = memo<AvatarProps>(({
  src,
  alt,
  size = "md",
  fallback,
  className = "",
}) => {
  const [imgError, setImgError] = useState(false);

  const initials = fallback
    ?? alt
      .split(" ")
      .map(w => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const classes = [
    styles.avatar,
    styles[`avatar--${size}`],
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className={classes} role="img" aria-label={alt}>
      {src && !imgError
        ? (
            <img
              src={src}
              alt={alt}
              className={styles.image}
              onError={() => setImgError(true)}
            />
          )
        : (
            <span className={styles.initials} aria-hidden="true">
              {initials}
            </span>
          )}
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;
