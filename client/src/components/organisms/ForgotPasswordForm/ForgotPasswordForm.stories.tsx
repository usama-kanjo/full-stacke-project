import type { Meta, StoryObj } from "@storybook/react";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

const meta: Meta<typeof ForgotPasswordForm> = {
  title: "Organisms/ForgotPasswordForm",
  component: ForgotPasswordForm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ForgotPasswordForm>;

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
