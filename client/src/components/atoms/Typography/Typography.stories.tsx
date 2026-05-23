import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";

const meta: Meta<typeof Typography> = {
  title: "Atoms/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["h1", "h2", "h3", "h4", "h5", "h6", "body", "body-sm", "caption", "label"],
    },
    weight: {
      control: { type: "select" },
      options: ["light", "regular", "medium", "semibold", "bold", "extrabold"],
    },
    children: { control: { type: "text" } },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Default: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog.",
  },
};

export const HeadingScale: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "1rem" }}>
      <Typography variant="h1">H1 — Lalezar Display</Typography>
      <Typography variant="h2">H2 — Lalezar Display</Typography>
      <Typography variant="h3">H3 — Fraunces Serif</Typography>
      <Typography variant="h4">H4 — Fraunces Serif</Typography>
      <Typography variant="h5">H5 — Fraunces Serif</Typography>
      <Typography variant="h6">H6 — Sora Uppercase</Typography>
    </div>
  ),
};

export const BodyText: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem" }}>
      <Typography variant="body">
        Body — Sora regular for paragraphs. This is the primary reading text style
        used throughout the application for comfort and clarity.
      </Typography>
      <Typography variant="body-sm">
        Body-sm — Smaller body text for secondary information and descriptions.
      </Typography>
      <Typography variant="caption">
        Caption — Footnotes, disclaimers, and small detail text.
      </Typography>
      <Typography variant="label">Label — Form field labels, uppercase Sora.</Typography>
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", padding: "1rem" }}>
      <Typography variant="body" weight="light">Light weight</Typography>
      <Typography variant="body" weight="regular">Regular weight</Typography>
      <Typography variant="body" weight="medium">Medium weight</Typography>
      <Typography variant="body" weight="semibold">Semibold weight</Typography>
      <Typography variant="body" weight="bold">Bold weight</Typography>
      <Typography variant="body" weight="extrabold">Extrabold weight</Typography>
    </div>
  ),
};
