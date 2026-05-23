"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import styles from "./ForgotPasswordForm.module.css";

type ForgotPasswordFormProps = {
  onSubmit: (data: { email: string }) => Promise<void>;
  onNavigate: (step: "login") => void;
  isLoading?: boolean;
};

export function ForgotPasswordForm({
  onSubmit,
  onNavigate,
  isLoading = false,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("E-posta adresi gerekli");
      return;
    }
    setError("");
    await onSubmit({ email: email.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <p className={styles.description}>
        Şifrenizi sıfırlamak için e-posta adresinizi girin. Size 6 haneli bir
        kod göndereceğiz.
      </p>
      <FormField label="E-posta" error={error}>
        <Input
          type="email"
          placeholder="ornek@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </FormField>
      <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
        {isLoading ? "Gönderiliyor..." : "Kod Gönder"}
      </Button>
      <div className={styles.actions}>
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

ForgotPasswordForm.displayName = "ForgotPasswordForm";
export default ForgotPasswordForm;
