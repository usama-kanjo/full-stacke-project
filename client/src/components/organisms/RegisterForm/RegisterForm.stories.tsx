import type { Meta, StoryObj } from "@storybook/react";
import { RegisterForm } from "./RegisterForm";

const meta: Meta<typeof RegisterForm> = {
  title: "Organisms/RegisterForm",
  component: RegisterForm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RegisterForm>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    onSubmit: async () => {},
    onNavigate: () => {},
  },
};

export const Loading: Story = {
  args: {
    open: true,
    onClose: () => {},
    onSubmit: async () => {},
    onNavigate: () => {},
    isLoading: true,
  },
};
