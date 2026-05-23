"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Modal } from "@/components/molecules/Modal";
import { FormField } from "@/components/molecules/FormField";
import styles from "./RegisterForm.module.css";

type RegisterFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { email: string; password: string }) => Promise<void>;
  onNavigate: (step: "login") => void;
  isLoading?: boolean;
};

export function RegisterForm({
  open,
  onClose,
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
    { newErrors.email = "Email address is required"; }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain at least one number";
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0)
    { return; }
    await onSubmit({ email: email.trim(), password });
  };

  return (
    <Modal open={open} onClose={onClose} title="Register" size="sm">
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
            placeholder="At least 8 characters"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormField>
        <FormField label="Confirm Password" error={errors.confirmPassword}>
          <Input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </FormField>
        <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
          {isLoading ? "Saving..." : "Register"}
        </Button>
        <div className={styles.links}>
          <button
            type="button"
            className={styles.link}
            onClick={() => onNavigate("login")}
          >
            Already have an account? Log in
          </button>
        </div>
      </form>
    </Modal>
  );
}

RegisterForm.displayName = "RegisterForm";
export default RegisterForm;
