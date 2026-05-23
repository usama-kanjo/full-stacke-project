"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Input } from "@/components/atoms/Input";
import { Modal } from "@/components/molecules/Modal";
import { FormField } from "@/components/molecules/FormField";
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
    const newErrors: Record<string, string> = {};

    if (!role)
    { newErrors.role = "Lütfen rol seçin"; }
    if (!fullName.trim() || fullName.trim().length < 2)
    { newErrors.fullName = "Ad soyad en az 2 karakter olmalı"; }
    if (!phone.trim())
    { newErrors.phone = "Telefon numarası gerekli"; }

    if (role === "DENTIST" && !clinicName.trim())
    { newErrors.clinicName = "Klinik adı gerekli"; }
    if (role === "LAB_TECHNICIAN" && !labName.trim())
    { newErrors.labName = "Laboratuvar adı gerekli"; }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0)
    { return; }

    const payload = {
      role: role!,
      fullName: fullName.trim(),
      phone: phone.trim(),
      ...(role === "DENTIST"
        ? {
            clinicName: clinicName.trim(),
            clinicAddress: clinicAddress.trim() || undefined,
            clinicCity: clinicCity.trim() || undefined,
          }
        : {
            labName: labName.trim(),
            labAddress: labAddress.trim() || undefined,
            labCity: labCity.trim() || undefined,
          }),
    };

    await onSubmit(payload);
    setIsSuccess(true);
  };

  return (
    <Modal
      open={open}
      onClose={onClose ?? (() => {})}
      title="Profili Tamamla"
      size="md"
    >
      {isSuccess ? (
        <div className={styles.success}>
          <div className={styles.successIcon}>✅</div>
          <h2 className={styles.successTitle}>Profil Tamamlandı!</h2>
          <p className={styles.successDescription}>
            Hoş geldiniz! Dashboard'a yönlendiriliyorsunuz...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <div className={styles.section}>
            <FormField label="Rol Seçin" error={errors.role}>
              <div className={styles.roleGroup}>
                <button
                  type="button"
                  className={`${styles.roleCard} ${role === "DENTIST" ? styles["roleCard--selected"] : ""}`}
                  onClick={() => setRole("DENTIST")}
                >
                  <span className={styles.roleIcon}>🦷</span>
                  Diş Hekimi
                </button>
                <button
                  type="button"
                  className={`${styles.roleCard} ${role === "LAB_TECHNICIAN" ? styles["roleCard--selected"] : ""}`}
                  onClick={() => setRole("LAB_TECHNICIAN")}
                >
                  <span className={styles.roleIcon}>⚙️</span>
                  Laboratuvar Teknisyeni
                </button>
              </div>
            </FormField>
          </div>

          <div className={styles.section}>
            <FormField label="Ad Soyad" error={errors.fullName}>
              <Input
                type="text"
                placeholder="Adınız ve soyadınız"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
              />
            </FormField>
            <FormField label="Telefon" error={errors.phone}>
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
              <FormField label="Klinik Adı" error={errors.clinicName}>
                <Input
                  type="text"
                  placeholder="Klinik adı"
                  value={clinicName}
                  onChange={e => setClinicName(e.target.value)}
                />
              </FormField>
              <FormField label="Klinik Adresi">
                <Input
                  type="text"
                  placeholder="Adres"
                  value={clinicAddress}
                  onChange={e => setClinicAddress(e.target.value)}
                />
              </FormField>
              <FormField label="Klinik Şehir">
                <Input
                  type="text"
                  placeholder="Şehir"
                  value={clinicCity}
                  onChange={e => setClinicCity(e.target.value)}
                />
              </FormField>
            </div>
          )}

          {role === "LAB_TECHNICIAN" && (
            <div className={styles.section}>
              <FormField label="Laboratuvar Adı" error={errors.labName}>
                <Input
                  type="text"
                  placeholder="Laboratuvar adı"
                  value={labName}
                  onChange={e => setLabName(e.target.value)}
                />
              </FormField>
              <FormField label="Laboratuvar Adresi">
                <Input
                  type="text"
                  placeholder="Adres"
                  value={labAddress}
                  onChange={e => setLabAddress(e.target.value)}
                />
              </FormField>
              <FormField label="Laboratuvar Şehir">
                <Input
                  type="text"
                  placeholder="Şehir"
                  value={labCity}
                  onChange={e => setLabCity(e.target.value)}
                />
              </FormField>
            </div>
          )}

          <Button type="submit" variant="primary" fullWidth disabled={isLoading}>
            {isLoading ? "Kaydediliyor..." : "Profili Tamamla"}
          </Button>
        </form>
      )}
    </Modal>
  );
}

ProfileCompletionForm.displayName = "ProfileCompletionForm";
export default ProfileCompletionForm;
