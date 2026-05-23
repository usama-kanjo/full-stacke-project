import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "@/components/atoms/Badge";
import { Typography } from "@/components/atoms/Typography";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Molecules/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["outlined", "elevated", "flat"],
    },
    padding: {
      control: { type: "select" },
      options: ["none", "sm", "md", "lg"],
    },
    hoverable: { control: { type: "boolean" } },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Outlined: Story = {
  render: () => (
    <Card variant="outlined">
      <Typography>Outlined card with border</Typography>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated">
      <Typography>Elevated card with shadow</Typography>
    </Card>
  ),
};

export const Flat: Story = {
  render: () => (
    <Card variant="flat">
      <Typography>Flat card with background</Typography>
    </Card>
  ),
};

export const WithContent: Story = {
  render: () => (
    <Card variant="elevated" padding="md" style={{ maxWidth: "300px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <Badge variant="success">Tamamlandı</Badge>
        <Typography variant="h4">Sipariş #1234</Typography>
        <Typography variant="body-sm">Hasta: Ahmet Yılmaz</Typography>
        <Typography variant="body-sm">İş: Tam Protez Üst</Typography>
      </div>
    </Card>
  ),
};

export const Clickable: Story = {
  render: () => (
    <Card variant="elevated" hoverable onClick={() => {}} style={{ maxWidth: "300px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Typography variant="h5">Dashboard Kartı</Typography>
        <Typography variant="body-sm">Tıklanabilir kart</Typography>
      </div>
    </Card>
  ),
};

export const PaddingSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Card variant="outlined" padding="none"><Typography variant="body-sm">padding: none</Typography></Card>
      <Card variant="outlined" padding="sm"><Typography variant="body-sm">padding: sm</Typography></Card>
      <Card variant="outlined" padding="md"><Typography variant="body-sm">padding: md</Typography></Card>
      <Card variant="outlined" padding="lg"><Typography variant="body-sm">padding: lg</Typography></Card>
    </div>
  ),
};
