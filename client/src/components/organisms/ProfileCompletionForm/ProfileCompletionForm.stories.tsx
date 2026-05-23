import type { Meta, StoryObj } from "@storybook/react";
import { ProfileCompletionForm } from "./ProfileCompletionForm";

const meta: Meta<typeof ProfileCompletionForm> = {
  title: "Organisms/ProfileCompletionForm",
  component: ProfileCompletionForm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProfileCompletionForm>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => {},
    onSubmit: async () => {},
  },
};

export const DentistSelected: Story = {
  args: {
    open: true,
    onClose: () => {},
    onSubmit: async () => {},
  },
  render: args => (
    <ProfileCompletionForm key="dentist" {...args} />
  ),
};

export const Loading: Story = {
  args: {
    open: true,
    onClose: () => {},
    onSubmit: async () => {},
    isLoading: true,
  },
};
