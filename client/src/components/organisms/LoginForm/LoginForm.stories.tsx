import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
  title: "Organisms/LoginForm",
  component: LoginForm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

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
