"use client";

import React from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { Modal } from "@/components/molecules/Modal";
import useForm from "@/hooks";
import { emailSchema, loginPasswordFieldSchema, loginSchema } from "@/lib/schemas";
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
  const { getFieldProps, handleSubmit } = useForm({
    schema: loginSchema,
    fieldSchemas: {
      email: emailSchema,
      password: loginPasswordFieldSchema,
    },
    initialValues: { email: "", password: "" },
  });

  const emailField = getFieldProps("email");
  const passwordField = getFieldProps("password");

  return (
    <Modal open={open} onClose={onClose} title="Log In" size="sm">
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
        <FormField label="Email" error={emailField.error}>
          <Input type="email" placeholder="ornek@email.com" {...emailField} />
        </FormField>
        <FormField label="Password" error={passwordField.error}>
          <Input type="password" placeholder="••••••••" {...passwordField} />
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
