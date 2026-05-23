import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Modal } from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Molecules/Modal",
  component: Modal,
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean" },
    title: { control: "text" },
    size: {
      control: { type: "radio" },
      options: ["sm", "md", "lg"],
    },
    closeOnOverlay: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => (
    <Modal open onClose={() => {}} title="Modal Title" size="md">
      <p>This is the modal content.</p>
    </Modal>
  ),
};

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = useState<"sm" | "md" | "lg">("md");
    const [open, setOpen] = useState(false);
    const openModal = (s: "sm" | "md" | "lg") => {
      setSize(s);
      setOpen(true);
    };
    return (
      <div style={{ display: "flex", gap: "8px" }}>
        {(["sm", "md", "lg"] as const).map(s => (
          <button key={s} onClick={() => openModal(s)}>
            Open
            {" "}
            {s.toUpperCase()}
          </button>
        ))}
        <Modal open={open} onClose={() => setOpen(false)} title={`${size.toUpperCase()} Modal`} size={size}>
          <p>
            This is a
            {size}
            {" "}
            modal. Resize to see the difference.
          </p>
        </Modal>
      </div>
    );
  },
};

export const WithLongContent: Story = {
  render: () => (
    <Modal open onClose={() => {}} title="Terms &amp; Conditions" size="lg">
      <div>
        {Array.from({ length: 10 }, (_, i) => (
          <p key={i}>
            Section
            {" "}
            {i + 1}
            : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        ))}
      </div>
    </Modal>
  ),
};
