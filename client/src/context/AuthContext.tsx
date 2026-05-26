"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useState,
} from "react";
import authService, { type AuthResponse } from "@/services/authService";

type User = {
  id: number;
  email: string;
  isVerified: boolean;
  isProfileComplete: boolean;
  role: "DENTIST" | "LAB_TECHNICIAN" | null;
};

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (email: string, password: string) => Promise<AuthResponse>;
  verifyEmail: (code: string) => Promise<AuthResponse>;
  resendCode: () => Promise<AuthResponse>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = useCallback(async (email: string, password: string) => {
    const res = await authService.login({ email, password });
    const u = res.data.data.user;
    if (u) {
      setUser({
        id: u.id,
        email: u.email,
        isVerified: u.isVerified,
        isProfileComplete: u.isProfileComplete,
        role: u.role,
      });
    }
    return res.data;
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    const res = await authService.register({ email, password });
    const u = res.data.data.user;
    if (u) {
      setUser({
        id: u.id,
        email: u.email,
        isVerified: u.isVerified,
        isProfileComplete: u.isProfileComplete,
        role: u.role,
      });
    }
    return res.data;
  }, []);

  const verifyEmail = useCallback(async (code: string) => {
    const res = await authService.verifyEmail({ verificationCode: code });
    return res.data;
  }, []);

  const resendCode = useCallback(async () => {
    const res = await authService.resendCode();
    return res.data;
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        verifyEmail,
        resendCode,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
