"use client";

import React, { useCallback } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { Modal } from "@/components/molecules/Modal";
import useForm from "@/hooks";
import { confirmPasswordFieldSchema, passwordSchema, resetPasswordSchema, verificationCodeSchema } from "@/lib/schemas";
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
  const { getFieldProps, handleSubmit, setValues } = useForm({
    schema: resetPasswordSchema,
    fieldSchemas: {
      code: verificationCodeSchema,
      newPassword: passwordSchema,
      confirmPassword: confirmPasswordFieldSchema,
    },
    initialValues: { code: "", newPassword: "", confirmPassword: "" },
  });

  const codeField = getFieldProps("code");
  const newPasswordField = getFieldProps("newPassword");
  const confirmPasswordField = getFieldProps("confirmPassword");

  const handleCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value.replace(NON_DIGIT, "").slice(0, 6);
      setValues(prev => ({ ...prev, code: val }));
      codeField.onChange({ target: { value: val } } as React.ChangeEvent<HTMLInputElement>);
    },
    [setValues, codeField],
  );

  const handleFormSubmit = handleSubmit(async (data) => {
    await onSubmit({ code: data.code, newPassword: data.newPassword });
  });

  return (
    <Modal open={open} onClose={onClose} title="Reset Password" size="sm">
      <form
        onSubmit={handleFormSubmit}
        className={styles.form}
        noValidate
      >
        <p className={styles.description}>
          Enter the 6-digit code sent to your email and your new password.
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
        <FormField label="New Password" error={newPasswordField.error}>
          <Input type="password" placeholder="At least 8 characters" {...newPasswordField} />
        </FormField>
        <FormField label="Confirm New Password" error={confirmPasswordField.error}>
          <Input type="password" placeholder="Re-enter your password" {...confirmPasswordField} />
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
