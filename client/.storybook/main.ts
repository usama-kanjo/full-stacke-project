// ============================================================
// .storybook/main.ts
// ============================================================
// Storybook configuration: where to look for stories and which addons are enabled
// ============================================================

import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],

  addons: [
    "@storybook/addon-docs",
  ],

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
};

export default config;
