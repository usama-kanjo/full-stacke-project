import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./Toggle";

const meta: Meta<typeof Toggle> = {
  title: "Molecules/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    label: { control: "text" },
    disabled: { control: "boolean" },
    size: {
      control: { type: "radio" },
      options: ["sm", "md"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    label: "Enable notifications",
  },
};

export const On: Story = {
  args: {
    label: "Notifications enabled",
    checked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Toggle size="sm" label="Small toggle" />
      <Toggle size="md" label="Medium toggle" />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Disabled toggle",
    disabled: true,
  },
};

export const DisabledOn: Story = {
  args: {
    label: "Disabled (on)",
    checked: true,
    disabled: true,
  },
};
