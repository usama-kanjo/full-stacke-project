import api from "@/lib/api";

export type AuthResponse = {
  status: string;
  message: string;
  data: {
    user?: {
      id: number;
      email: string;
      isVerified: boolean;
      isProfileComplete: boolean;
      role: "DENTIST" | "LAB_TECHNICIAN" | null;
    };
  };
};

export type ProfileResponse = AuthResponse & {
  data: {
    role: "DENTIST" | "LAB_TECHNICIAN";
    profile: Record<string, unknown>;
  };
};

export const authService = {
  register(data: { email: string; password: string }) {
    return api.post<AuthResponse>("/user/register", data);
  },

  login(data: { email: string; password: string }) {
    return api.post<AuthResponse>("/user/login", data);
  },

  verifyEmail(data: { verificationCode: string }) {
    return api.post<AuthResponse>("/user/verify-email", data);
  },

  resendCode() {
    return api.post<AuthResponse>("/user/resend-code");
  },

  forgotPassword(data: { email: string }) {
    return api.post<AuthResponse>("/user/forgot-password", data);
  },

  resetPassword(data: { email: string; code: string; newPassword: string }) {
    return api.post<AuthResponse>("/user/reset-password", data);
  },

  logout() {
    return api.post<AuthResponse>("/user/logout");
  },

  completeProfile(data: {
    role: "DENTIST" | "LAB_TECHNICIAN";
    fullName: string;
    phone: string;
    clinicName?: string;
    clinicAddress?: string;
    clinicCity?: string;
    labName?: string;
    labAddress?: string;
    labCity?: string;
  }) {
    return api.post<ProfileResponse>("/user/complete-profile", data);
  },

  changePassword(data: { currentPassword: string; newPassword: string }) {
    return api.put<AuthResponse>("/user/change-password", data);
  },
};
