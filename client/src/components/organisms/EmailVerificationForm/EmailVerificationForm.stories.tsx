import type { Meta, StoryObj } from "@storybook/react";
import { EmailVerificationForm } from "./EmailVerificationForm";

const meta: Meta<typeof EmailVerificationForm> = {
  title: "Organisms/EmailVerificationForm",
  component: EmailVerificationForm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmailVerificationForm>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    onSubmit: async () => {},
    onNavigate: () => {},
    onResend: async () => {},
  },
};

export const Filled: Story = {
  args: {
    open: true,
    onClose: () => {},
    onSubmit: async () => {},
    onNavigate: () => {},
    onResend: async () => {},
  },
  render: args => (
    <EmailVerificationForm key="filled" {...args} />
  ),
};

export const Loading: Story = {
  args: {
    open: true,
    onClose: () => {},
    onSubmit: async () => {},
    onNavigate: () => {},
    onResend: async () => {},
    isLoading: true,
  },
};
