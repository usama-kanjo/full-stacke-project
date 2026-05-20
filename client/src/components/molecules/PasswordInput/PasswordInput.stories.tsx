import type { Meta, StoryObj } from "@storybook/react";
import { PasswordInput } from "./PasswordInput";

const meta: Meta<typeof PasswordInput> = {
  title: "Molecules/PasswordInput",
  component: PasswordInput,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    placeholder: { control: { type: "text" } },
    error: { control: { type: "text" } },
    disabled: { control: { type: "boolean" } },
    fullWidth: { control: { type: "boolean" } },
  },
};

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    placeholder: "Enter password",
  },
};

export const WithError: Story = {
  args: {
    placeholder: "Enter password",
    error: "Password must be at least 8 characters",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Enter password",
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: "Enter password",
    fullWidth: true,
  },
};
