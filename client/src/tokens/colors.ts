export const colorTokens = {
  gold: {
    50: "#FDF6E7",
    100: "#F9E8C0",
    200: "#F0D48E",
    300: "#E5BC5A",
    400: "#D4A843",
    500: "#C89B3C",
    600: "#B8860B",
    700: "#9A7220",
    800: "#7A5A1A",
    900: "#5C4213",
  },

  terracotta: {
    50: "#FDF2EE",
    100: "#F8DDD3",
    200: "#F0BAA6",
    300: "#E69174",
    400: "#D97A58",
    500: "#C66B4D",
    600: "#A8553B",
    700: "#8A442F",
    800: "#6E3625",
    900: "#52281B",
  },

  cream: {
    50: "#FEFCF8",
    100: "#FDF8F0",
    200: "#FCF3E5",
    300: "#F8EAD1",
    400: "#F2DDB8",
    500: "#E8CD9C",
  },

  teal: {
    50: "#EFFAF8",
    100: "#D5F2ED",
    200: "#B0E5DB",
    300: "#7DD2C3",
    400: "#4FB8A5",
    500: "#3A9D8C",
    600: "#2C7F70",
    700: "#256559",
    800: "#215149",
    900: "#1D433D",
  },

  success: {
    light: "#E8F5E9",
    base: "#5B8C5A",
    dark: "#2E5E2D",
  },
  error: {
    light: "#FDE8E8",
    base: "#C04040",
    dark: "#8B2020",
  },
  warning: {
    light: "#FFF3D6",
    base: "#C89020",
    dark: "#7A5A10",
  },
  info: {
    light: "#E0F2FE",
    base: "#0EA5E9",
    dark: "#0C4A6E",
  },

  neutral: {
    0: "#FFFFFF",
    50: "#FCFAF7",
    100: "#F5F2ED",
    200: "#EBE5DD",
    300: "#D6CFC5",
    400: "#B0A79A",
    500: "#8C8377",
    600: "#6B6358",
    700: "#5C4A3A",
    800: "#3C2E22",
    900: "#2C1810",
  },
} as const;

export type ColorTokens = typeof colorTokens;
