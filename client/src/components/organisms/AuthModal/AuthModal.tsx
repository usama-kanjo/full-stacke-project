"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Modal } from "@/components/molecules/Modal";
import { EmailVerificationForm } from "@/components/organisms/EmailVerificationForm";
import { ForgotPasswordForm } from "@/components/organisms/ForgotPasswordForm";
import { LoginForm } from "@/components/organisms/LoginForm";
import { RegisterForm } from "@/components/organisms/RegisterForm";
import { ResetPasswordForm } from "@/components/organisms/ResetPasswordForm";
import { useAuth } from "@/hooks/useAuth";
import styles from "./AuthModal.module.css";

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
  const [animKey, setAnimKey] = useState(0);

  const navigate = useCallback(
    (nextStep: Step) => {
      setStep(nextStep);
      setAnimKey(k => k + 1);
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
        toast.success("Giriş başarılı");
        handleClose();
        onLoginSuccess?.();
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Giriş başarısız");
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
        toast.success("Kayıt başarılı! Lütfen e-postanızı doğrulayın.");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Kayıt başarısız");
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
        toast.success("E-posta doğrulandı!");
        handleClose();
        onLoginSuccess?.();
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Doğrulama başarısız",
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
        toast.success("Şifre sıfırlama kodu e-postanıza gönderildi.");
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "İşlem başarısız",
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
        toast.success("Şifreniz başarıyla sıfırlandı. Giriş yapabilirsiniz.");
        navigate("login");
      } catch (err) {
        toast.error(
          err instanceof Error ? err.message : "Şifre sıfırlama başarısız",
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
      toast.success("Yeni doğrulama kodu gönderildi.");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Kod gönderilemedi",
      );
    }
  }, [resendCode]);

  const title
    = step === "login"
      ? "Giriş Yap"
      : step === "register"
        ? "Kayıt Ol"
        : step === "verify"
          ? "E-posta Doğrulama"
          : step === "forgot-password"
            ? "Şifremi Unuttum"
            : "Şifre Sıfırla";

  const form = (() => {
    switch (step) {
      case "login":
        return (
          <LoginForm
            key={animKey}
            onSubmit={handleLogin}
            onNavigate={navigate}
            isLoading={isLoading}
          />
        );
      case "register":
        return (
          <RegisterForm
            key={animKey}
            onSubmit={handleRegister}
            onNavigate={navigate}
            isLoading={isLoading}
          />
        );
      case "verify":
        return (
          <EmailVerificationForm
            key={animKey}
            onSubmit={handleVerify}
            onNavigate={navigate}
            isLoading={isLoading}
            onResend={handleResendCode}
          />
        );
      case "forgot-password":
        return (
          <ForgotPasswordForm
            key={animKey}
            onSubmit={handleForgotPassword}
            onNavigate={navigate}
            isLoading={isLoading}
          />
        );
      case "reset-password":
        return (
          <ResetPasswordForm
            key={animKey}
            onSubmit={handleResetPassword}
            onNavigate={navigate}
            isLoading={isLoading}
            email={sharedEmail}
          />
        );
    }
  })();

  return (
    <Modal open={open} onClose={handleClose} title={title} size="sm">
      <div className={styles.slide}>{form}</div>
    </Modal>
  );
}

AuthModal.displayName = "AuthModal";
export default AuthModal;
