"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Modal } from "@/components/molecules/Modal";
import { FormField } from "@/components/molecules/FormField";
import styles from "./LoginForm.module.css";

type LoginFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { email: string; password: string }) => Promise<void>;
  onNavigate: (step: "register" | "forgot-password") => void;
  isLoading?: boolean;
};

export function LoginForm({
  open,
  onClose,
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
    { newErrors.email = "Email address is required"; }
    if (!password)
    { newErrors.password = "Password is required"; }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0)
    { return; }
    await onSubmit({ email: email.trim(), password });
  };

  return (
    <Modal open={open} onClose={onClose} title="Log In" size="sm">
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <FormField label="Email" error={errors.email}>
          <Input
            type="email"
            placeholder="ornek@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormField>
        <FormField label="Password" error={errors.password}>
          <Input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormField>
        <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </Button>
        <div className={styles.links}>
          <button
            type="button"
            className={styles.link}
            onClick={() => onNavigate("register")}
          >
            Don't have an account? Register
          </button>
          <button
            type="button"
            className={styles.link}
            onClick={() => onNavigate("forgot-password")}
          >
            Forgot password
          </button>
        </div>
      </form>
    </Modal>
  );
}

LoginForm.displayName = "LoginForm";
export default LoginForm;
