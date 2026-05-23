import type { Meta, StoryObj } from "@storybook/react";
import { ResetPasswordForm } from "./ResetPasswordForm";

const meta: Meta<typeof ResetPasswordForm> = {
  title: "Organisms/ResetPasswordForm",
  component: ResetPasswordForm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ResetPasswordForm>;

export const Default: Story = {
  args: {
    onSubmit: async () => {},
    onNavigate: () => {},
  },
};

export const Filled: Story = {
  args: {
    onSubmit: async () => {},
    onNavigate: () => {},
  },
};

export const Loading: Story = {
  args: {
    onSubmit: async () => {},
    onNavigate: () => {},
    isLoading: true,
  },
};
