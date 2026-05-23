"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Modal } from "@/components/molecules/Modal";
import { FormField } from "@/components/molecules/FormField";
import styles from "./EmailVerificationForm.module.css";

type EmailVerificationFormProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { verificationCode: string }) => Promise<void>;
  onNavigate: (step: "login") => void;
  isLoading?: boolean;
  onResend?: () => Promise<void>;
};

const NON_DIGIT = /\D/g;

export function EmailVerificationForm({
  open,
  onClose,
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
      setError("Please enter the 6-digit verification code");
      return;
    }
    setError("");
    await onSubmit({ verificationCode: code.trim() });
  };

  return (
    <Modal open={open} onClose={onClose} title="Email Verification" size="sm">
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <p className={styles.description}>
          Enter the 6-digit verification code sent to your email.
        </p>
        <FormField label="Verification Code" error={error}>
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
        <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
        <div className={styles.actions}>
          {onResend && (
            <button
              type="button"
              className={styles.link}
              onClick={onResend}
            >
              Resend code
            </button>
          )}
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

EmailVerificationForm.displayName = "EmailVerificationForm";
export default EmailVerificationForm;
