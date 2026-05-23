import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";
import { PasswordInput } from "@/components/molecules/PasswordInput";
import { FormField } from "./FormField";

const meta: Meta<typeof FormField> = {
  title: "Molecules/FormField",
  component: FormField,
  tags: ["autodocs"],
  argTypes: {
    label: { control: { type: "text" } },
    required: { control: { type: "boolean" } },
    error: { control: { type: "text" } },
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  args: {
    label: "Full Name",
    required: true,
    children: <Input placeholder="Enter your name" />,
  },
};

export const WithIcon: Story = {
  args: {
    label: "Email",
    required: true,
    leftIcon: <Icon name="mail" />,
    children: <Input type="email" placeholder="mail@example.com" />,
  },
};

export const WithError: Story = {
  args: {
    label: "Password",
    required: true,
    error: "Password must be at least 8 characters",
    children: <PasswordInput placeholder="••••••••" />,
  },
};

export const Optional: Story = {
  args: {
    label: "Phone (optional)",
    children: <Input type="tel" placeholder="05xx xxx xx xx" />,
  },
};
