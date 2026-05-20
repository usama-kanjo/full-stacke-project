import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: { type: "text" },
      description: "Component content",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the component",
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge",
  },
};

export const Disabled: Story = {
  args: {
    children: "Badge",
    disabled: true,
  },
};
