// ============================================================
// .storybook/preview.ts
// ============================================================
// Global preview configuration for Storybook:
// - Import CSS tokens so they apply to every story
// - Set text direction
// ============================================================

import type { Preview } from "@storybook/react";

import "../src/tokens/tokens.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#F9FAFB" },
        { name: "white", value: "#FFFFFF" },
        { name: "dark", value: "#111827" },
      ],
    },

    viewport: {
      defaultViewport: "responsive",
    },

    docs: {
      theme: undefined,
    },

    html: {
      dir: "ltr",
    },
  },
};

export default preview;
