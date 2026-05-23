import type { Meta, StoryObj } from "@storybook/react";
import { AuthTemplate } from "./AuthTemplate";

const meta: Meta<typeof AuthTemplate> = {
  title: "Templates/AuthTemplate",
  component: AuthTemplate,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AuthTemplate>;

export const Default: Story = {};
