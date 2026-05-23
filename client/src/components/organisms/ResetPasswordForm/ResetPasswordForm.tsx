"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Modal } from "@/components/molecules/Modal";
import { FormField } from "@/components/molecules/FormField";
import styles from "./ResetPasswordForm.module.css";

type ResetPasswordFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { code: string; newPassword: string }) => Promise<void>;
  onNavigate: (step: "login") => void;
  isLoading?: boolean;
  email?: string;
};

const NON_DIGIT = /\D/g;

export function ResetPasswordForm({
  open,
  onClose,
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
      newErrors.code = "Please enter the 6-digit code";
    }
    if (!newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (!/[A-Z]/.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one uppercase letter";
    } else if (!/[0-9]/.test(newPassword)) {
      newErrors.newPassword = "Password must contain at least one number";
    }
    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0)
    { return; }
    await onSubmit({ code: code.trim(), newPassword });
  };

  return (
    <Modal open={open} onClose={onClose} title="Reset Password" size="sm">
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <p className={styles.description}>
          Enter the 6-digit code sent to your email and your new password.
        </p>
        <FormField label="Verification Code" error={errors.code}>
          <Input
            type="text"
            placeholder="123456"
            value={code}
            onChange={(e) => {
              const val = e.target.value.replace(NON_DIGIT, "").slice(0, 6);
              setCode(val);
            }}
            maxLength={6}
          />
        </FormField>
        <FormField label="New Password" error={errors.newPassword}>
          <Input
            type="password"
            placeholder="At least 8 characters"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
        </FormField>
        <FormField label="Confirm New Password" error={errors.confirmPassword}>
          <Input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </FormField>
        <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
          {isLoading ? "Resetting..." : "Reset Password"}
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

ResetPasswordForm.displayName = "ResetPasswordForm";
export default ResetPasswordForm;
