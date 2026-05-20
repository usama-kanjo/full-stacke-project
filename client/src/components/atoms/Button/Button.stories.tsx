// Storybook file for documenting the Button component.
//
// What is Storybook?
// A tool that displays your components in isolation with:
//   - Controls: change props directly from the interface
//   - Docs: auto-generated documentation from JSDoc and TypeScript types
//   - Actions: track events (onClick, onChange...)
// ============================================================

import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

// ─── Meta ────────────────────────────────────────────────────
// Sets the general story settings and how it appears in the Storybook sidebar
const meta: Meta<typeof Button> = {
  title: "Atoms/Button", // path in the sidebar
  component: Button,
  tags: ["autodocs"], // generates auto documentation

  // argTypes: controls how props are displayed in the Controls panel
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "ghost", "danger"],
      description: "Visual type of the button",
      table: {
        type: { summary: "ButtonVariant" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
      description: "Button size",
      table: {
        type: { summary: "ButtonSize" },
        defaultValue: { summary: "md" },
      },
    },
    loading: {
      control: { type: "boolean" },
      description: "Loading state - disables button and shows spinner",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable the button",
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Makes the button fill the container width",
    },
    onClick: { action: "clicked" }, // logs clicks in the Actions panel
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// ─── Stories ─────────────────────────────────────────────────
// Each "Story" = one use case of the component

/** Default button with default settings */
export const Default: Story = {
  args: {
    children: "زر أساسي",
    variant: "primary",
    size: "md",
  },
};

/** عرض كل الـ Variants جنبًا إلى جنب */
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All available variants. Use `primary` for the main action, and `danger` for destructive actions.",
      },
    },
  },
};

/** Display all sizes */
export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "12px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Button size="sm">صغير</Button>
      <Button size="md">متوسط</Button>
      <Button size="lg">كبير</Button>
    </div>
  ),
};

/** Button in loading state */
export const Loading: Story = {
  args: {
    children: "جاري الحفظ...",
    loading: true,
    variant: "primary",
  },
};

/** Disabled button */
export const Disabled: Story = {
  args: {
    children: "غير متاح",
    disabled: true,
  },
};

/** Button with icon */
export const WithIcon: Story = {
  render: () => (
    <Button variant="primary" leftIcon={<span>➕</span>}>
      إضافة عنصر
    </Button>
  ),
};

/** Button with right icon */
export const WithRightIcon: Story = {
  render: () => (
    <Button variant="secondary" rightIcon={<span>➡️</span>}>
      عرض المزيد
    </Button>
  ),
};

/** Button that fills full width */
export const FullWidth: Story = {
  args: {
    children: "تسجيل الدخول",
    fullWidth: true,
    variant: "primary",
    size: "lg",
  },
};

/** Danger button - realistic example */
export const DangerExample: Story = {
  render: () => (
    <Button variant="danger" leftIcon={<span>🗑️</span>}>
      حذف الحساب
    </Button>
  ),
};
