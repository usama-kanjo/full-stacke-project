import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Molecules/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    label: { control: "text" },
    error: { control: "text" },
    disabled: { control: "boolean" },
    fullWidth: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

const sampleOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
  { value: "option4", label: "Option 4" },
];

export const Default: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Choose an option",
  },
};

export const WithValue: Story = {
  args: {
    options: sampleOptions,
    value: "option2",
  },
};

export const WithLabel: Story = {
  args: {
    options: sampleOptions,
    label: "Select Role",
    placeholder: "Choose role...",
  },
};

export const WithError: Story = {
  args: {
    options: sampleOptions,
    label: "Category",
    error: "Please select a category",
  },
};

export const Disabled: Story = {
  args: {
    options: sampleOptions,
    value: "option1",
    disabled: true,
    label: "Locked Field",
  },
};

export const FullWidth: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Full width dropdown",
    fullWidth: true,
  },
};

export const WithDisabledOption: Story = {
  args: {
    options: [
      ...sampleOptions,
      { value: "disabled", label: "Unavailable", disabled: true },
    ],
    placeholder: "Select...",
  },
};
