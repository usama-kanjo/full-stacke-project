import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number", "tel", "url"],
    },
    placeholder: { control: { type: "text" } },
    error: { control: { type: "text" } },
    disabled: { control: { type: "boolean" } },
    fullWidth: { control: { type: "boolean" } },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithValue: Story = {
  args: {
    placeholder: "Enter text...",
    defaultValue: "Sample text",
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Enter text...",
    error: "This field is required",
    defaultValue: "invalid",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled input",
    disabled: true,
  },
};

export const WithLeftIcon: Story = {
  render: () => <Input placeholder="Search..." leftIcon={<span>🔍</span>} />,
};

export const WithRightIcon: Story = {
  render: () => <Input placeholder="Enter text..." rightIcon={<span>✓</span>} />,
};

export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "Small input",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    placeholder: "Large input",
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: "Full width input",
    fullWidth: true,
  },
};

export const EmailType: Story = {
  args: {
    type: "email",
    placeholder: "email@example.com",
  },
};
