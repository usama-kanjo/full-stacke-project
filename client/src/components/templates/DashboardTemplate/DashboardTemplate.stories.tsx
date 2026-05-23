import type { Meta, StoryObj } from "@storybook/react";
import { AuthContext } from "@/context/AuthContext";
import { DashboardTemplate } from "./DashboardTemplate";

const loggedInUser = {
  id: 1,
  email: "doctor@example.com",
  isVerified: true,
  isProfileComplete: true,
  role: "DENTIST" as const,
};

const mockAuthValue = {
  user: loggedInUser,
  isLoading: false,
  isAuthenticated: true,
  login: async () => ({ status: "success", message: "", data: {} }),
  register: async () => ({ status: "success", message: "", data: {} }),
  verifyEmail: async () => ({ status: "success", message: "", data: {} }),
  resendCode: async () => ({ status: "success", message: "", data: {} }),
  logout: async () => {},
  setUser: () => {},
};

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
  decorators: [
    Story => (
      <AuthContext.Provider value={mockAuthValue}>
        <Story />
      </AuthContext.Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DashboardTemplate>;

export const Default: Story = {
  args: {
    children: <div style={{ padding: "2rem" }}>Page Content Here</div>,
  },
};
