"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import { Modal } from "@/components/molecules/Modal";
import { formatZodErrors, profileCompletionSchema } from "@/lib/schemas";
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
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [clinicCity, setClinicCity] = useState("");
  const [labName, setLabName] = useState("");
  const [labAddress, setLabAddress] = useState("");
  const [labCity, setLabCity] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      role: role ?? undefined,
      fullName,
      phone,
      clinicName: clinicName || undefined,
      clinicAddress: clinicAddress || undefined,
      clinicCity: clinicCity || undefined,
      labName: labName || undefined,
      labAddress: labAddress || undefined,
      labCity: labCity || undefined,
    };

    const result = profileCompletionSchema.safeParse(payload);
    if (!result.success) {
      setErrors(formatZodErrors(result.error));
      return;
    }
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
            <form onSubmit={handleSubmit} className={styles.form} noValidate>
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
                <FormField label="Full Name" error={errors.fullName}>
                  <Input
                    type="text"
                    placeholder="Your full name"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                  />
                </FormField>
                <FormField label="Phone" error={errors.phone}>
                  <Input
                    type="tel"
                    placeholder="+90 555 123 4567"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </FormField>
              </div>

              {role === "DENTIST" && (
                <div className={styles.section}>
                  <FormField label="Clinic Name" error={errors.clinicName}>
                    <Input
                      type="text"
                      placeholder="Clinic name"
                      value={clinicName}
                      onChange={e => setClinicName(e.target.value)}
                    />
                  </FormField>
                  <FormField label="Clinic Address">
                    <Input
                      type="text"
                      placeholder="Address"
                      value={clinicAddress}
                      onChange={e => setClinicAddress(e.target.value)}
                    />
                  </FormField>
                  <FormField label="Clinic City">
                    <Input
                      type="text"
                      placeholder="City"
                      value={clinicCity}
                      onChange={e => setClinicCity(e.target.value)}
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
                      value={labName}
                      onChange={e => setLabName(e.target.value)}
                    />
                  </FormField>
                  <FormField label="Lab Address">
                    <Input
                      type="text"
                      placeholder="Address"
                      value={labAddress}
                      onChange={e => setLabAddress(e.target.value)}
                    />
                  </FormField>
                  <FormField label="Lab City">
                    <Input
                      type="text"
                      placeholder="City"
                      value={labCity}
                      onChange={e => setLabCity(e.target.value)}
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
