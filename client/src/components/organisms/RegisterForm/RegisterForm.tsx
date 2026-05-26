"use client";

import React from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { Modal } from "@/components/molecules/Modal";
import useForm from "@/hooks";
import { confirmPasswordFieldSchema, emailSchema, passwordSchema, registerSchema } from "@/lib/schemas";
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
  const { getFieldProps, handleSubmit } = useForm({
    schema: registerSchema,
    fieldSchemas: {
      email: emailSchema,
      password: passwordSchema,
      confirmPassword: confirmPasswordFieldSchema,
    },
    initialValues: { email: "", password: "", confirmPassword: "" },
  });

  const emailField = getFieldProps("email");
  const passwordField = getFieldProps("password");
  const confirmPasswordField = getFieldProps("confirmPassword");

  const handleFormSubmit = handleSubmit(async (data) => {
    await onSubmit({ email: data.email, password: data.password });
  });

  return (
    <Modal open={open} onClose={onClose} title="Register" size="sm">
      <form
        onSubmit={handleFormSubmit}
        className={styles.form}
        noValidate
      >
        <FormField label="Email" error={emailField.error}>
          <Input type="email" placeholder="ornek@email.com" {...emailField} />
        </FormField>
        <FormField label="Password" error={passwordField.error}>
          <Input type="password" placeholder="At least 8 characters" {...passwordField} />
        </FormField>
        <FormField label="Confirm Password" error={confirmPasswordField.error}>
          <Input type="password" placeholder="Re-enter your password" {...confirmPasswordField} />
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
