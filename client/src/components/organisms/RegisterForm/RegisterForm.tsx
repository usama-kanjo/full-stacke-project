"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import styles from "./RegisterForm.module.css";

type RegisterFormProps = {
  onSubmit: (data: { email: string; password: string }) => Promise<void>;
  onNavigate: (step: "login") => void;
  isLoading?: boolean;
};

export function RegisterForm({
  onSubmit,
  onNavigate,
  isLoading = false,
}: RegisterFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!email.trim())
    { newErrors.email = "E-posta adresi gerekli"; }
    if (!password) {
      newErrors.password = "Şifre gerekli";
    } else if (password.length < 8) {
      newErrors.password = "Şifre en az 8 karakter olmalı";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Şifre en az bir büyük harf içermeli";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Şifre en az bir rakam içermeli";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0)
    { return; }
    await onSubmit({ email: email.trim(), password });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form} noValidate>
      <FormField label="E-posta" error={errors.email}>
        <Input
          type="email"
          placeholder="ornek@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </FormField>
      <FormField label="Şifre" error={errors.password}>
        <Input
          type="password"
          placeholder="En az 8 karakter"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </FormField>
      <FormField label="Şifre Tekrar" error={errors.confirmPassword}>
        <Input
          type="password"
          placeholder="Şifrenizi tekrar girin"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </FormField>
      <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
        {isLoading ? "Kaydediliyor..." : "Kayıt Ol"}
      </Button>
      <div className={styles.links}>
        <button
          type="button"
          className={styles.link}
          onClick={() => onNavigate("login")}
        >
          Zaten hesabın var mı? Giriş yap
        </button>
      </div>
    </form>
  );
}

RegisterForm.displayName = "RegisterForm";
export default RegisterForm;
