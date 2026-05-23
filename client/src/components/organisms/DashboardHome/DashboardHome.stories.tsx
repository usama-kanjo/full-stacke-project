import type { Meta, StoryObj } from "@storybook/react";
import { AuthContext } from "@/context/AuthContext";
import { DashboardHome } from "./DashboardHome";

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

const meta: Meta<typeof DashboardHome> = {
  title: "Organisms/DashboardHome",
  component: DashboardHome,
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
type Story = StoryObj<typeof DashboardHome>;

export const Dentist: Story = {
  decorators: [
    Story => (
      <AuthContext.Provider
        value={{
          ...mockAuthValue,
          user: {
            id: 1,
            email: "doctor@example.com",
            isVerified: true,
            isProfileComplete: true,
            role: "DENTIST",
          },
          isAuthenticated: true,
        }}
      >
        <Story />
      </AuthContext.Provider>
    ),
  ],
};

export const Technician: Story = {
  decorators: [
    Story => (
      <AuthContext.Provider
        value={{
          ...mockAuthValue,
          user: {
            id: 2,
            email: "tech@example.com",
            isVerified: true,
            isProfileComplete: true,
            role: "LAB_TECHNICIAN",
          },
          isAuthenticated: true,
        }}
      >
        <Story />
      </AuthContext.Provider>
    ),
  ],
};
