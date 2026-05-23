import type { Meta, StoryObj } from "@storybook/react";
import { DashboardTemplate } from "./DashboardTemplate";

const meta: Meta<typeof DashboardTemplate> = {
  title: "Templates/DashboardTemplate",
  component: DashboardTemplate,
  tags: ["autodocs"],
  parameters: {
    nextjs: {
      navigation: {
        pathname: "/dashboard",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DashboardTemplate>;

export const Default: Story = {
  args: {
    children: <div style={{ padding: "2rem" }}>Page Content Here</div>,
  },
};
