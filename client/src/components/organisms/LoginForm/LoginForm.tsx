"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import styles from "./LoginForm.module.css";

type LoginFormProps = {
  onSubmit: (data: { email: string; password: string }) => Promise<void>;
  onNavigate: (step: "register" | "forgot-password") => void;
  isLoading?: boolean;
};

export function LoginForm({
  onSubmit,
  onNavigate,
  isLoading = false,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!email.trim())
    { newErrors.email = "E-posta adresi gerekli"; }
    if (!password)
    { newErrors.password = "Şifre gerekli"; }
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
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </FormField>
      <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
        {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
      </Button>
      <div className={styles.links}>
        <button
          type="button"
          className={styles.link}
          onClick={() => onNavigate("register")}
        >
          Hesabın yok mu? Kayıt ol
        </button>
        <button
          type="button"
          className={styles.link}
          onClick={() => onNavigate("forgot-password")}
        >
          Şifremi unuttum
        </button>
      </div>
    </form>
  );
}

LoginForm.displayName = "LoginForm";
export default LoginForm;
