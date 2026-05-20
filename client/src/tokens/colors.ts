export const colorTokens = {
  // ─── Brand Colors ───────────────────────────────────────────
  primary: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    200: "#BFDBFE",
    300: "#93C5FD",
    400: "#60A5FA",
    500: "#3B82F6",
    600: "#2563EB",
    700: "#1D4ED8",
    800: "#1E40AF",
    900: "#1E3A8A",
  },

  // ─── Semantic Colors ────────────────────────────────────────
  success: {
    light: "#D1FAE5",
    base: "#10B981",
    dark: "#065F46",
  },
  error: {
    light: "#FEE2E2",
    base: "#EF4444",
    dark: "#7F1D1D",
  },
  warning: {
    light: "#FEF3C7",
    base: "#F59E0B",
    dark: "#78350F",
  },
  info: {
    light: "#E0F2FE",
    base: "#0EA5E9",
    dark: "#0C4A6E",
  },

  // ─── Neutral Colors ─────────────────────────────────────────
  neutral: {
    0: "#FFFFFF",
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
    1000: "#000000",
  },
} as const;

// ─── Type Helper ────────────────────────────────────────────
export type ColorTokens = typeof colorTokens;
