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
      <Typography variant="h1">h1. Heading 1</Typography>
      <Typography variant="h2">h2. Heading 2</Typography>
      <Typography variant="h3">h3. Heading 3</Typography>
      <Typography variant="h4">h4. Heading 4</Typography>
      <Typography variant="h5">h5. Heading 5</Typography>
      <Typography variant="h6">h6. Heading 6</Typography>
    </div>
  ),
};

export const BodyText: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem" }}>
      <Typography variant="body">
        Body — Normal paragraf metni. Bu component design system'in ana metin stili.
      </Typography>
      <Typography variant="body-sm">
        Body-sm — Daha küçük paragraf metni. Yardımcı açıklamalar için.
      </Typography>
      <Typography variant="caption">
        Caption — Dipnot, açıklama, küçük detay metinleri.
      </Typography>
      <Typography variant="label">Label — Form alanı etiketi.</Typography>
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
