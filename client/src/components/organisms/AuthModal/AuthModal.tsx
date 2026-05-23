"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { EmailVerificationForm } from "@/components/organisms/EmailVerificationForm";
import { ForgotPasswordForm } from "@/components/organisms/ForgotPasswordForm";
import { LoginForm } from "@/components/organisms/LoginForm";
import { RegisterForm } from "@/components/organisms/RegisterForm";
import { ResetPasswordForm } from "@/components/organisms/ResetPasswordForm";
import { useAuth } from "@/hooks/useAuth";

type Step
  = | "login"
    | "register"
    | "verify"
    | "forgot-password"
    | "reset-password";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  onLoginSuccess?: () => void;
};

export function AuthModal({ open, onClose, onLoginSuccess }: AuthModalProps) {
  const { login, register, verifyEmail, resendCode } = useAuth();
  const [step, setStep] = useState<Step>("login");
  const [isLoading, setIsLoading] = useState(false);
  const [sharedEmail, setSharedEmail] = useState("");

  const navigate = useCallback(
    (nextStep: Step) => {
      setStep(nextStep);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setStep("login");
    setSharedEmail("");
    onClose();
  }, [onClose]);

  const handleLogin = useCallback(
    async (data: { email: string; password: string }) => {
      setIsLoading(true);
      try {
        await login(data.email, data.password);
        toast.success("Login successful");
        handleClose();
        onLoginSuccess?.();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Login failed");
      } finally {
        setIsLoading(false);
      }
    },
    [login, handleClose, onLoginSuccess],
  );

  const handleRegister = useCallback(
    async (data: { email: string; password: string }) => {
      setIsLoading(true);
      try {
        await register(data.email, data.password);
        setSharedEmail(data.email);
        navigate("verify");
        toast.success("Registration successful! Please verify your email.");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Registration failed");
      } finally {
        setIsLoading(false);
      }
    },
    [register, navigate],
  );

  const handleVerify = useCallback(
    async (data: { verificationCode: string }) => {
      setIsLoading(true);
      try {
        await verifyEmail(data.verificationCode);
        toast.success("Email verified!");
        handleClose();
        onLoginSuccess?.();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Verification failed",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [verifyEmail, handleClose, onLoginSuccess],
  );

  const handleForgotPassword = useCallback(
    async (data: { email: string }) => {
      setIsLoading(true);
      try {
        setSharedEmail(data.email);
        navigate("reset-password");
        toast.success("Password reset code sent to your email.");
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Operation failed",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [navigate],
  );

  const handleResetPassword = useCallback(
    async (data: { code: string; newPassword: string }) => {
      setIsLoading(true);
      try {
        const { authService } = await import("@/services/authService");
        await authService.resetPassword({
          email: sharedEmail,
          code: data.code,
          newPassword: data.newPassword,
        });
        toast.success("Password reset successfully. You can log in.");
        navigate("login");
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Password reset failed",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [sharedEmail, navigate],
  );

  const handleResendCode = useCallback(async () => {
    try {
      await resendCode();
      toast.success("New verification code sent.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to send code",
      );
    }
  }, [resendCode]);

  return (
    <>
      <LoginForm
        open={open && step === "login"}
        onClose={handleClose}
        onSubmit={handleLogin}
        onNavigate={navigate}
        isLoading={isLoading}
      />
      <RegisterForm
        open={open && step === "register"}
        onClose={handleClose}
        onSubmit={handleRegister}
        onNavigate={navigate}
        isLoading={isLoading}
      />
      <EmailVerificationForm
        open={open && step === "verify"}
        onClose={handleClose}
        onSubmit={handleVerify}
        onNavigate={navigate}
        isLoading={isLoading}
        onResend={handleResendCode}
      />
      <ForgotPasswordForm
        open={open && step === "forgot-password"}
        onClose={handleClose}
        onSubmit={handleForgotPassword}
        onNavigate={navigate}
        isLoading={isLoading}
      />
      <ResetPasswordForm
        open={open && step === "reset-password"}
        onClose={handleClose}
        onSubmit={handleResetPassword}
        onNavigate={navigate}
        isLoading={isLoading}
        email={sharedEmail}
      />
    </>
  );
}

AuthModal.displayName = "AuthModal";
export default AuthModal;
