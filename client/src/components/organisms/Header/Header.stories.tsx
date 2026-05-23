import type { Meta, StoryObj } from "@storybook/react";
import { AuthContext } from "@/context/AuthContext";
import { Header } from "./Header";

const mockUser = {
  id: 1,
  email: "doctor@example.com",
  isVerified: true,
  isProfileComplete: true,
  role: "DENTIST" as const,
};

const mockContextValue = {
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

const meta: Meta<typeof Header> = {
  title: "Organisms/Header",
  component: Header,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const LoggedOut: Story = {
  args: {
    onLoginClick: () => {},
  },
};

export const LoggedIn: Story = {
  args: {
    onLoginClick: () => {},
  },
  decorators: [
    Story => (
      <AuthContext.Provider value={{ ...mockContextValue, user: mockUser, isAuthenticated: true }}>
        <Story />
      </AuthContext.Provider>
    ),
  ],
};
