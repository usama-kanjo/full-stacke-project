import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Atoms/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "success", "warning", "error", "neutral"],
      description: "لون الـ Badge بناءً على المعنى الدلالي",
    },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
    dot: {
      control: { type: "boolean" },
      description: "إضافة نقطة ملوّنة قبل النص",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: "جديد", variant: "primary" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <Badge variant="primary">أساسي</Badge>
      <Badge variant="success">مكتمل ✓</Badge>
      <Badge variant="warning">قيد الانتظار</Badge>
      <Badge variant="error">خطأ</Badge>
      <Badge variant="neutral">مؤرشف</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px" }}>
      <Badge variant="success" dot>
        متصل
      </Badge>
      <Badge variant="error" dot>
        غير متصل
      </Badge>
      <Badge variant="warning" dot>
        في انتظار الموافقة
      </Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <Badge size="sm">صغير</Badge>
      <Badge size="md">متوسط</Badge>
      <Badge size="lg">كبير</Badge>
    </div>
  ),
};
