"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import styles from "./ResetPasswordForm.module.css";

type ResetPasswordFormProps = {
  onSubmit: (data: { code: string; newPassword: string }) => Promise<void>;
  onNavigate: (step: "login") => void;
  isLoading?: boolean;
  email?: string;
};

export function ResetPasswordForm({
  onSubmit,
  onNavigate,
  isLoading = false,
}: ResetPasswordFormProps) {
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!code.trim() || code.length !== 6) {
      newErrors.code = "Lütfen 6 haneli kodu girin";
    }
    if (!newPassword) {
      newErrors.newPassword = "Yeni şifre gerekli";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Şifre en az 8 karakter olmalı";
    } else if (!/[A-Z]/.test(newPassword)) {
      newErrors.newPassword = "Şifre en az bir büyük harf içermeli";
    } else if (!/[0-9]/.test(newPassword)) {
      newErrors.newPassword = "Şifre en az bir rakam içermeli";
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0)
    { return; }
    await onSubmit({ code: code.trim(), newPassword });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <p className={styles.description}>
        E-postanıza gönderilen 6 haneli kodu ve yeni şifrenizi girin.
      </p>
      <FormField label="Doğrulama Kodu" error={errors.code}>
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
      <FormField label="Yeni Şifre" error={errors.newPassword}>
        <Input
          type="password"
          placeholder="En az 8 karakter"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
      </FormField>
      <FormField label="Yeni Şifre Tekrar" error={errors.confirmPassword}>
        <Input
          type="password"
          placeholder="Şifrenizi tekrar girin"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </FormField>
      <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
        {isLoading ? "Sıfırlanıyor..." : "Şifreyi Sıfırla"}
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

ResetPasswordForm.displayName = "ResetPasswordForm";
export default ResetPasswordForm;
