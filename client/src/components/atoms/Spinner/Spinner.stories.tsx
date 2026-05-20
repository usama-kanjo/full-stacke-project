import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Atoms/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: {
    size: "md",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem" }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const Colored: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <span style={{ color: "var(--color-primary-500)" }}><Spinner /></span>
      <span style={{ color: "var(--color-error)" }}><Spinner /></span>
      <span style={{ color: "var(--color-success)" }}><Spinner /></span>
      <span style={{ color: "var(--color-neutral-400)" }}><Spinner /></span>
    </div>
  ),
};
