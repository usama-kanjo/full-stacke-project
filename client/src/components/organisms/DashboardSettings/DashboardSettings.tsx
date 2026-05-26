"use client";

import { type FormEvent, useCallback, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";
import authService from "@/services/authService";
import styles from "./DashboardSettings.module.css";

export function DashboardSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPassword.trim()) {
      setError("Current password is required");
      return;
    }
    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setSaving(true);
    try {
      await authService.changePassword({ currentPassword, newPassword });
      setSuccess("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setSaving(false);
    }
  }, [currentPassword, newPassword, confirmPassword]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
      </div>

      <div className={styles.card}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Change Password</h2>
          <p className={styles.sectionDesc}>Update your account password.</p>

          {error && (
            <div className={styles.alertError}>
              <Icon name="alertCircle" size="sm" />
              {" "}
              {error}
            </div>
          )}
          {success && (
            <div className={styles.alertSuccess}>
              <Icon name="check" size="sm" />
              {" "}
              {success}
            </div>
          )}

          <form onSubmit={handleChangePassword} className={styles.form}>
            <FormField label="Current Password">
              <Input
                type="password"
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="Your current password"
                fullWidth
              />
            </FormField>
            <FormField label="New Password">
              <Input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                fullWidth
              />
            </FormField>
            <FormField label="Confirm New Password">
              <Input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your new password"
                fullWidth
              />
            </FormField>
            <Button type="submit" variant="primary" loading={saving}>
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

DashboardSettings.displayName = "DashboardSettings";
export default DashboardSettings;
