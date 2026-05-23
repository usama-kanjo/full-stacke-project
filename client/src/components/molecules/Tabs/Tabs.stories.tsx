import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Molecules/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    defaultTab: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const sampleTabs = [
  { id: "details", label: "Details", content: <p>Order details content here.</p> },
  { id: "history", label: "History", content: <p>Order history content here.</p> },
  { id: "notes", label: "Notes", content: <p>Clinical notes content here.</p> },
];

export const Default: Story = {
  args: {
    tabs: sampleTabs,
    defaultTab: "details",
  },
};

export const WithDisabledTab: Story = {
  args: {
    tabs: [
      { id: "info", label: "Info", content: <p>Basic info.</p> },
      { id: "settings", label: "Settings", content: <p>Settings panel.</p> },
      { id: "advanced", label: "Advanced", disabled: true, content: <p>Advanced settings (locked).</p> },
    ],
    defaultTab: "info",
  },
};

export const ManyTabs: Story = {
  args: {
    tabs: [
      { id: "1", label: "General", content: <p>General tab</p> },
      { id: "2", label: "Profile", content: <p>Profile tab</p> },
      { id: "3", label: "Security", content: <p>Security tab</p> },
      { id: "4", label: "Notifications", content: <p>Notifications tab</p> },
      { id: "5", label: "Billing", content: <p>Billing tab</p> },
    ],
    defaultTab: "1",
  },
};
