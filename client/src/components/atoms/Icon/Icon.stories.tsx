import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: { type: "select" },
      options: [
        "eye",
        "eyeOff",
        "mail",
        "lock",
        "user",
        "search",
        "check",
        "close",
        "alertCircle",
        "info",
        "chevronDown",
        "chevronLeft",
        "chevronRight",
        "menu",
        "plus",
        "arrowLeft",
        "arrowRight",
      ],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: "eye",
  },
};

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", padding: "1rem" }}>
      {([
        "eye",
        "eyeOff",
        "mail",
        "lock",
        "user",
        "search",
        "check",
        "close",
        "alertCircle",
        "info",
        "chevronDown",
        "chevronLeft",
        "chevronRight",
        "menu",
        "plus",
        "arrowLeft",
        "arrowRight",
      ] as const).map(name => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "0.75rem",
          }}
        >
          <Icon name={name} size="xl" />
          <span>{name}</span>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem" }}>
      <Icon name="eye" size="sm" />
      <Icon name="eye" size="md" />
      <Icon name="eye" size="lg" />
      <Icon name="eye" size="xl" />
    </div>
  ),
};

export const Colored: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "1rem", padding: "1rem" }}>
      <Icon name="check" size="lg" />
      <span style={{ color: "green" }}><Icon name="check" size="lg" /></span>
      <span style={{ color: "red" }}><Icon name="close" size="lg" /></span>
      <span style={{ color: "var(--color-primary-500)" }}><Icon name="info" size="lg" /></span>
    </div>
  ),
};
