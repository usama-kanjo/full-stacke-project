"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { Modal } from "@/components/molecules/Modal";
import { formatZodErrors, registerSchema } from "@/lib/schemas";
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
    const result = registerSchema.safeParse({ email, password, confirmPassword });
    if (!result.success) {
      setErrors(formatZodErrors(result.error));
      return;
    }
    await onSubmit({ email: result.data.email, password: result.data.password });
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
