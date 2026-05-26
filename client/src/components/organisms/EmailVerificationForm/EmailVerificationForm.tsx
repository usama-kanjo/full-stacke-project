"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { Modal } from "@/components/molecules/Modal";
import useForm from "@/hooks";
import { verificationCodeSchema, verifyEmailSchema } from "@/lib/schemas";
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
  const { getFieldProps, handleSubmit, setValues } = useForm({
    schema: verifyEmailSchema,
    fieldSchemas: {
      verificationCode: verificationCodeSchema,
    },
    initialValues: { verificationCode: "" },
  });

  const codeField = getFieldProps("verificationCode");

  const handleCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(NON_DIGIT, "").slice(0, 6);
      setValues(prev => ({ ...prev, verificationCode: val }));
      codeField.onChange({ target: { value: val } } as React.ChangeEvent<HTMLInputElement>);
    },
    [setValues, codeField],
  );

  return (
    <Modal open={open} onClose={onClose} title="Email Verification" size="sm">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
        <p className={styles.description}>
          Enter the 6-digit verification code sent to your email.
        </p>
        <FormField label="Verification Code" error={codeField.error}>
          <Input
            type="text"
            placeholder="123456"
            value={codeField.value}
            onChange={handleCodeChange}
            onBlur={codeField.onBlur}
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
