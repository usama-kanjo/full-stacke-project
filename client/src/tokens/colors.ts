export const colors = {
  primary: {
    50: "#eef2ff",
    100: "#e0e7ff",
    200: "#c7d2fe",
    300: "#a5b4fc",
    400: "#818cf8",
    500: "#6366f1",
    600: "#4f46e5",
    700: "#4338ca",
    800: "#3730a3",
    900: "#312e81",
    950: "#1e1b4b",
  },
  neutral: {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#e5e5e5",
    300: "#d4d4d4",
    400: "#a3a3a3",
    500: "#737373",
    600: "#525252",
    700: "#404040",
    800: "#262626",
    900: "#171717",
    950: "#0a0a0a",
  },
  success: {
    500: "#22c55e",
    700: "#15803d",
  },
  error: {
    500: "#ef4444",
    700: "#b91c1c",
  },
  warning: {
    500: "#f59e0b",
    700: "#b45309",
  },
  white: "#ffffff",
  black: "#000000",
} as const;

export type ColorKey = keyof typeof colors;
