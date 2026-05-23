import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Molecules/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "radio" },
      options: ["checkbox", "radio"],
    },
    label: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "Accept terms",
  },
};

export const Checked: Story = {
  args: {
    label: "Accept terms",
    checked: true,
  },
};

export const Radio: Story = {
  args: {
    type: "radio",
    label: "Option A",
  },
};

export const RadioChecked: Story = {
  args: {
    type: "radio",
    label: "Option B",
    checked: true,
  },
};

export const WithError: Story = {
  args: {
    label: "Accept terms",
    error: "You must accept the terms",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled option",
    disabled: true,
  },
};

export const Group: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <Checkbox label="Option 1" />
      <Checkbox label="Option 2" checked />
      <Checkbox label="Option 3" />
    </div>
  ),
};
