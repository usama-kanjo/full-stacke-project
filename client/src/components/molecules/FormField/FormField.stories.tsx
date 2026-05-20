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
    label: "Ad Soyad",
    required: true,
    children: <Input placeholder="Adınızı girin" />,
  },
};

export const WithIcon: Story = {
  args: {
    label: "E-posta",
    required: true,
    leftIcon: <Icon name="mail" />,
    children: <Input type="email" placeholder="mail@example.com" />,
  },
};

export const WithError: Story = {
  args: {
    label: "Şifre",
    required: true,
    error: "Şifre en az 8 karakter olmalıdır",
    children: <PasswordInput placeholder="••••••••" />,
  },
};

export const Optional: Story = {
  args: {
    label: "Telefon (opsiyonel)",
    children: <Input type="tel" placeholder="05xx xxx xx xx" />,
  },
};
