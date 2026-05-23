import type { Meta, StoryObj } from "@storybook/react";
import { AuthContext } from "@/context/AuthContext";
import { AuthModal } from "./AuthModal";

const mockAuthValue = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  login: async () => ({ status: "success", message: "", data: {} }),
  register: async () => ({ status: "success", message: "", data: {} }),
  verifyEmail: async () => ({ status: "success", message: "", data: {} }),
  resendCode: async () => ({ status: "success", message: "", data: {} }),
  logout: async () => {},
  setUser: () => {},
};

const meta: Meta<typeof AuthModal> = {
  title: "Organisms/AuthModal",
  component: AuthModal,
  tags: ["autodocs"],
  decorators: [
    Story => (
      <AuthContext.Provider value={mockAuthValue}>
        <Story />
      </AuthContext.Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AuthModal>;

export const Open: Story = {
  args: {
    open: true,
    onClose: () => {},
  },
};
