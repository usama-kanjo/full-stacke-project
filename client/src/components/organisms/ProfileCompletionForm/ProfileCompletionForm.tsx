"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { Modal } from "@/components/molecules/Modal";
import useForm from "@/hooks";
import { fullNameFieldSchema, phoneFieldSchema, profileCompletionSchema } from "@/lib/schemas";
import styles from "./ProfileCompletionForm.module.css";

type ProfileCompletionFormProps = {
  open: boolean;
  onClose?: () => void;
  onSubmit: (data: {
    role: "DENTIST" | "LAB_TECHNICIAN";
    fullName: string;
    phone: string;
    clinicName?: string;
    clinicAddress?: string;
    clinicCity?: string;
    labName?: string;
    labAddress?: string;
    labCity?: string;
  }) => Promise<void>;
  isLoading?: boolean;
};

export function ProfileCompletionForm({
  open,
  onClose,
  onSubmit,
  isLoading = false,
}: ProfileCompletionFormProps) {
  const [role, setRole] = useState<"DENTIST" | "LAB_TECHNICIAN" | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const { getFieldProps, setValues, values, errors, setErrors } = useForm({
    schema: profileCompletionSchema,
    fieldSchemas: {
      fullName: fullNameFieldSchema,
      phone: phoneFieldSchema,
    },
    initialValues: {
      fullName: "",
      phone: "",
      clinicName: "",
      clinicAddress: "",
      clinicCity: "",
      labName: "",
      labAddress: "",
      labCity: "",
    },
  });

  const fullNameField = getFieldProps("fullName");
  const phoneField = getFieldProps("phone");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...values,
      role: role ?? undefined,
      clinicName: values.clinicName || undefined,
      clinicAddress: values.clinicAddress || undefined,
      clinicCity: values.clinicCity || undefined,
      labName: values.labName || undefined,
      labAddress: values.labAddress || undefined,
      labCity: values.labCity || undefined,
    };
    const result = profileCompletionSchema.safeParse(payload);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as string;
        if (!fieldErrors[key]) {
          fieldErrors[key] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    await onSubmit(result.data as Parameters<typeof onSubmit>[0]);
    setIsSuccess(true);
  };

  return (
    <Modal
      open={open}
      onClose={onClose ?? (() => {})}
      title="Complete Profile"
      size="md"
    >
      {isSuccess
        ? (
            <div className={styles.success}>
              <div className={styles.successIcon}><Icon name="check" size="xl" /></div>
              <h2 className={styles.successTitle}>Profile Completed!</h2>
              <p className={styles.successDescription}>
                Welcome! Redirecting to dashboard...
              </p>
            </div>
          )
        : (
            <form onSubmit={submitHandler} className={styles.form} noValidate>
              <div className={styles.section}>
                <FormField label="Select Role" error={errors.role}>
                  <div className={styles.roleGroup}>
                    <button
                      type="button"
                      className={`${styles.roleCard} ${role === "DENTIST" ? styles["roleCard--selected"] : ""}`}
                      onClick={() => setRole("DENTIST")}
                    >
                      <span className={styles.roleIcon}><Icon name="tooth" size="lg" /></span>
                      Dentist
                    </button>
                    <button
                      type="button"
                      className={`${styles.roleCard} ${role === "LAB_TECHNICIAN" ? styles["roleCard--selected"] : ""}`}
                      onClick={() => setRole("LAB_TECHNICIAN")}
                    >
                      <span className={styles.roleIcon}><Icon name="settings" size="lg" /></span>
                      Lab Technician
                    </button>
                  </div>
                </FormField>
              </div>

              <div className={styles.section}>
                <FormField label="Full Name" error={fullNameField.error}>
                  <Input type="text" placeholder="Your full name" {...fullNameField} />
                </FormField>
                <FormField label="Phone" error={phoneField.error}>
                  <Input type="tel" placeholder="+90 555 123 4567" {...phoneField} />
                </FormField>
              </div>

              {role === "DENTIST" && (
                <div className={styles.section}>
                  <FormField label="Clinic Name" error={errors.clinicName}>
                    <Input
                      type="text"
                      placeholder="Clinic name"
                      value={values.clinicName ?? ""}
                      onChange={e => setValues(prev => ({ ...prev, clinicName: e.target.value }))}
                    />
                  </FormField>
                  <FormField label="Clinic Address">
                    <Input
                      type="text"
                      placeholder="Address"
                      value={values.clinicAddress ?? ""}
                      onChange={e => setValues(prev => ({ ...prev, clinicAddress: e.target.value }))}
                    />
                  </FormField>
                  <FormField label="Clinic City">
                    <Input
                      type="text"
                      placeholder="City"
                      value={values.clinicCity ?? ""}
                      onChange={e => setValues(prev => ({ ...prev, clinicCity: e.target.value }))}
                    />
                  </FormField>
                </div>
              )}

              {role === "LAB_TECHNICIAN" && (
                <div className={styles.section}>
                  <FormField label="Lab Name" error={errors.labName}>
                    <Input
                      type="text"
                      placeholder="Lab name"
                      value={values.labName ?? ""}
                      onChange={e => setValues(prev => ({ ...prev, labName: e.target.value }))}
                    />
                  </FormField>
                  <FormField label="Lab Address">
                    <Input
                      type="text"
                      placeholder="Address"
                      value={values.labAddress ?? ""}
                      onChange={e => setValues(prev => ({ ...prev, labAddress: e.target.value }))}
                    />
                  </FormField>
                  <FormField label="Lab City">
                    <Input
                      type="text"
                      placeholder="City"
                      value={values.labCity ?? ""}
                      onChange={e => setValues(prev => ({ ...prev, labCity: e.target.value }))}
                    />
                  </FormField>
                </div>
              )}

              <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
                {isLoading ? "Saving..." : "Complete Profile"}
              </Button>
            </form>
          )}
    </Modal>
  );
}

ProfileCompletionForm.displayName = "ProfileCompletionForm";
export default ProfileCompletionForm;
