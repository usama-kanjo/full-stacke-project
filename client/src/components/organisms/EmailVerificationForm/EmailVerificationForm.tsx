"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import styles from "./EmailVerificationForm.module.css";

type EmailVerificationFormProps = {
  onSubmit: (data: { verificationCode: string }) => Promise<void>;
  onNavigate: (step: "login") => void;
  isLoading?: boolean;
  onResend?: () => Promise<void>;
};

export function EmailVerificationForm({
  onSubmit,
  onNavigate,
  isLoading = false,
  onResend,
}: EmailVerificationFormProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || code.length !== 6) {
      setError("Lütfen 6 haneli doğrulama kodunu girin");
      return;
    }
    setError("");
    await onSubmit({ verificationCode: code.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <p className={styles.description}>
        E-posta adresinize gönderilen 6 haneli doğrulama kodunu girin.
      </p>
      <FormField label="Doğrulama Kodu" error={error}>
        <Input
          type="text"
          placeholder="123456"
          value={code}
          onChange={(e) => {
            const val = e.target.value.replace(/\D/g, "").slice(0, 6);
            setCode(val);
          }}
          maxLength={6}
        />
      </FormField>
      <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
        {isLoading ? "Doğrulanıyor..." : "Doğrula"}
      </Button>
      <div className={styles.actions}>
        {onResend && (
          <button
            type="button"
            className={styles.link}
            onClick={onResend}
          >
            Kodu tekrar gönder
          </button>
        )}
        <button
          type="button"
          className={styles.link}
          onClick={() => onNavigate("login")}
        >
          Giriş sayfasına dön
        </button>
      </div>
    </form>
  );
}

EmailVerificationForm.displayName = "EmailVerificationForm";
export default EmailVerificationForm;
