import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "Molecules/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["success", "error", "warning", "info"],
    },
    message: { control: "text" },
    description: { control: "text" },
    autoDismiss: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    message: "Operation completed",
    variant: "info",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Toast variant="success" message="Saved successfully" description="Your changes have been saved." />
      <Toast variant="error" message="Something went wrong" description="Please try again later." />
      <Toast variant="warning" message="Warning" description="This action cannot be undone." />
      <Toast variant="info" message="New update available" />
    </div>
  ),
};

export const WithDescription: Story = {
  args: {
    message: "Profile updated",
    description: "Your profile information has been saved successfully.",
    variant: "success",
  },
};

export const WithAutoDismiss: Story = {
  args: {
    message: "This will auto-dismiss in 3s",
    variant: "info",
    autoDismiss: 3000,
  },
};
