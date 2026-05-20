// ============================================================
// src/tokens/index.ts
// ============================================================
// Collects all Tokens into a single file for easy importing.
// Instead of: import { colorTokens } from './tokens/colors'
// Use:        import { colorTokens } from './tokens'
// ============================================================

// Collect everything into one object for general use
import { colorTokens } from "./colors";
import { borderRadiusTokens, shadowTokens, spacingTokens } from "./spacing";
import { typographyTokens } from "./typography";

export { colorTokens } from "./colors";
export { borderRadiusTokens, shadowTokens, spacingTokens, transitionTokens, zIndexTokens } from "./spacing";
export { typographyTokens } from "./typography";

export const tokens = {
  color: colorTokens,
  typography: typographyTokens,
  spacing: spacingTokens,
  borderRadius: borderRadiusTokens,
  shadow: shadowTokens,
} as const;

export type Tokens = typeof tokens;
