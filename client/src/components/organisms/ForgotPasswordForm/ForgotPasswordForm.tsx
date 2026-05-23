"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Modal } from "@/components/molecules/Modal";
import { FormField } from "@/components/molecules/FormField";
import styles from "./ForgotPasswordForm.module.css";

type ForgotPasswordFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { email: string }) => Promise<void>;
  onNavigate: (step: "login") => void;
  isLoading?: boolean;
};

export function ForgotPasswordForm({
  open,
  onClose,
  onSubmit,
  onNavigate,
  isLoading = false,
}: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email address is required");
      return;
    }
    setError("");
    await onSubmit({ email: email.trim() });
  };

  return (
    <Modal open={open} onClose={onClose} title="Forgot Password" size="sm">
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <p className={styles.description}>
          Enter your email to reset your password. We'll send you a 6-digit code.
        </p>
        <FormField label="Email" error={error}>
          <Input
            type="email"
            placeholder="ornek@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormField>
        <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Code"}
        </Button>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.link}
            onClick={() => onNavigate("login")}
          >
            Back to login
          </button>
        </div>
      </form>
    </Modal>
  );
}

ForgotPasswordForm.displayName = "ForgotPasswordForm";
export default ForgotPasswordForm;
