import type { Preview } from "@storybook/react";

import "../src/tokens/tokens.css";

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "cream",
      values: [
        { name: "cream", value: "#FCFAF7" },
        { name: "white", value: "#FFFFFF" },
        { name: "dark", value: "#2C1810" },
      ],
    },

    viewport: {
      defaultViewport: "responsive",
    },

    docs: {
      toc: true,
    },

    html: {
      dir: "ltr",
    },
  },

  tags: ["autodocs"],
};

export default preview;
