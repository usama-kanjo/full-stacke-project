"use client";

import React from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { Modal } from "@/components/molecules/Modal";
import useForm from "@/hooks";
import { emailSchema, forgotPasswordSchema } from "@/lib/schemas";
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
  const { getFieldProps, handleSubmit } = useForm({
    schema: forgotPasswordSchema,
    fieldSchemas: {
      email: emailSchema,
    },
    initialValues: { email: "" },
  });

  const emailField = getFieldProps("email");

  return (
    <Modal open={open} onClose={onClose} title="Forgot Password" size="sm">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
        <p className={styles.description}>
          Enter your email to reset your password. We'll send you a 6-digit code.
        </p>
        <FormField label="Email" error={emailField.error}>
          <Input type="email" placeholder="ornek@email.com" {...emailField} />
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
