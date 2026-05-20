// ─── Spacing Scale ──────────────────────────────────────────

export const spacingTokens = {
  0: "0px",
  px: "1px",
  0.5: "0.125rem", //  2px
  1: "0.25rem", //  4px
  2: "0.5rem", //  8px
  3: "0.75rem", // 12px
  4: "1rem", // 16px
  5: "1.25rem", // 20px
  6: "1.5rem", // 24px
  8: "2rem", // 32px
  10: "2.5rem", // 40px
  12: "3rem", // 48px
  16: "4rem", // 64px
  20: "5rem", // 80px
  24: "6rem", // 96px
} as const;

// ─── Border Radius ──────────────────────────────────────────
export const borderRadiusTokens = {
  "none": "0px",
  "sm": "0.125rem", // 2px
  "base": "0.25rem", // 4px
  "md": "0.375rem", // 6px
  "lg": "0.5rem", // 8px
  "xl": "0.75rem", // 12px
  "2xl": "1rem", // 16px
  "full": "9999px",
} as const;

// ─── Box Shadows ────────────────────────────────────────────
export const shadowTokens = {
  none: "none",
  sm: "0 1px 2px 0 rgba(0,0,0,0.05)",
  base: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
  md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
  lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)",
  xl: "0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)",
} as const;

// ─── Z-Index ────────────────────────────────────────────────
export const zIndexTokens = {
  behind: "-1",
  base: "0",
  raised: "10",
  dropdown: "100",
  modal: "200",
  toast: "300",
  tooltip: "400",
} as const;

// ─── Transitions ────────────────────────────────────────────
export const transitionTokens = {
  fast: "150ms ease-in-out",
  normal: "250ms ease-in-out",
  slow: "400ms ease-in-out",
} as const;

export type SpacingTokens = typeof spacingTokens;
export type BorderRadiusTokens = typeof borderRadiusTokens;
export type ShadowTokens = typeof shadowTokens;
