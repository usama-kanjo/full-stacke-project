import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Molecules/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg", "xl"],
    },
    alt: { control: "text" },
    fallback: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    alt: "User Name",
    fallback: "UN",
    size: "md",
  },
};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?u=avatar",
    alt: "John Doe",
    size: "lg",
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar size="sm" fallback="JD" alt="John Doe" />
      <Avatar size="md" fallback="JD" alt="John Doe" />
      <Avatar size="lg" fallback="JD" alt="John Doe" />
      <Avatar size="xl" fallback="JD" alt="John Doe" />
    </div>
  ),
};

export const WithImageError: Story = {
  args: {
    src: "https://invalid.url/image.jpg",
    alt: "Jane Smith",
    size: "lg",
  },
};
