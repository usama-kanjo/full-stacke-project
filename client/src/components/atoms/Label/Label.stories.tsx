import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "Atoms/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    required: { control: { type: "boolean" } },
    disabled: { control: { type: "boolean" } },
    children: { control: { type: "text" } },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: "E-posta",
    htmlFor: "email",
  },
};

export const Required: Story = {
  args: {
    children: "Şifre",
    required: true,
    htmlFor: "password",
  },
};

export const Disabled: Story = {
  args: {
    children: "Ad Soyad",
    disabled: true,
    htmlFor: "name",
  },
};
