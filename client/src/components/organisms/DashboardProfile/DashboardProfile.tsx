"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { Input } from "@/components/atoms/Input";
import { Spinner } from "@/components/atoms/Spinner";
import { FormField } from "@/components/molecules/FormField";
import { useAuth } from "@/hooks/useAuth";
import { authService, type DentistProfile, type TechnicianProfile, type DentistUpdateData, type TechnicianUpdateData } from "@/services/authService";
import styles from "./DashboardProfile.module.css";

type ProfileData = DentistProfile | TechnicianProfile;

export function DashboardProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [clinicCity, setClinicCity] = useState("");
  const [labName, setLabName] = useState("");
  const [labAddress, setLabAddress] = useState("");
  const [labCity, setLabCity] = useState("");

  const role = user?.role;
  const isDentist = role === "DENTIST";

  const fetchProfile = useCallback(async () => {
    if (!role) return;
    setLoading(true);
    try {
      const res = await authService.getProfile(role);
      const p = res.data.data as ProfileData;
      setProfile(p);
      setFullName(p.fullName);
      setPhone(p.phone);
      if (isDentist) {
        const d = p as DentistProfile;
        setClinicName(d.clinicName);
        setClinicAddress(d.clinicAddress ?? "");
        setClinicCity(d.clinicCity ?? "");
      } else {
        const t = p as TechnicianProfile;
        setLabName(t.labName);
        setLabAddress(t.labAddress ?? "");
        setLabCity(t.labCity ?? "");
      }
    } catch {
      setError("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, [role, isDentist]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleSave = useCallback(async () => {
    if (!role) return;
    setSaving(true);
    try {
      const data = isDentist
        ? { fullName: fullName.trim(), phone: phone.trim(), clinicName: clinicName.trim(), clinicAddress: clinicAddress.trim() || undefined, clinicCity: clinicCity.trim() || undefined } as DentistUpdateData
        : { fullName: fullName.trim(), phone: phone.trim(), labName: labName.trim(), labAddress: labAddress.trim() || undefined, labCity: labCity.trim() || undefined } as TechnicianUpdateData;
      const res = await authService.updateProfile(role, data);
      setProfile(res.data.data as ProfileData);
      setEditing(false);
    } catch {
      setError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  }, [role, isDentist, fullName, phone, clinicName, clinicAddress, clinicCity, labName, labAddress, labCity]);

  const handleCancel = useCallback(() => {
    if (!profile) return;
    setFullName(profile.fullName);
    setPhone(profile.phone);
    if (isDentist) {
      const d = profile as DentistProfile;
      setClinicName(d.clinicName);
      setClinicAddress(d.clinicAddress ?? "");
      setClinicCity(d.clinicCity ?? "");
    } else {
      const t = profile as TechnicianProfile;
      setLabName(t.labName);
      setLabAddress(t.labAddress ?? "");
      setLabCity(t.labCity ?? "");
    }
    setEditing(false);
    setError("");
  }, [profile, isDentist]);

  if (loading) {
    return (
      <div className={styles.center}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className={styles.center}>
        <p className={styles.errorText}>{error}</p>
        <Button variant="primary" onClick={fetchProfile}>Retry</Button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Profile</h1>
        {!editing
          ? (
                <Button variant="secondary" size="sm" leftIcon={<Icon name="settings" size="sm" />} onClick={() => setEditing(true)}>
                  Edit
              </Button>
            )
          : (
              <div className={styles.editActions}>
                <Button variant="ghost" size="sm" onClick={handleCancel}>Cancel</Button>
                <Button variant="primary" size="sm" loading={saving} onClick={handleSave}>
                  Save
                </Button>
              </div>
            )}
      </div>

      {error && <div className={styles.alert}><Icon name="alertCircle" size="sm" /> {error}</div>}

      <div className={styles.card}>
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Account Information</h2>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email</span>
              <span className={styles.infoValue}>{profile && "user" in profile ? (profile as DentistProfile | TechnicianProfile).user.email : user?.email}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Role</span>
              <span className={styles.roleBadge}>
                <Icon name={isDentist ? "tooth" : "settings"} size="sm" />
                {isDentist ? "Dentist" : "Lab Technician"}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Personal Information</h2>
          <div className={styles.formGrid}>
            <FormField label="Full Name">
              <Input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                disabled={!editing}
                fullWidth
              />
            </FormField>
            <FormField label="Phone">
              <Input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                disabled={!editing}
                fullWidth
              />
            </FormField>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {isDentist ? "Clinic Information" : "Lab Information"}
          </h2>
          <div className={styles.formGrid}>
            {isDentist ? (
              <>
                <FormField label="Clinic Name">
                  <Input
                    type="text"
                    value={clinicName}
                    onChange={e => setClinicName(e.target.value)}
                    disabled={!editing}
                    fullWidth
                  />
                </FormField>
                <FormField label="Clinic Address">
                  <Input
                    type="text"
                    value={clinicAddress}
                    onChange={e => setClinicAddress(e.target.value)}
                    disabled={!editing}
                    fullWidth
                  />
                </FormField>
                <FormField label="Clinic City">
                  <Input
                    type="text"
                    value={clinicCity}
                    onChange={e => setClinicCity(e.target.value)}
                    disabled={!editing}
                    fullWidth
                  />
                </FormField>
              </>
            ) : (
              <>
                <FormField label="Lab Name">
                  <Input
                    type="text"
                    value={labName}
                    onChange={e => setLabName(e.target.value)}
                    disabled={!editing}
                    fullWidth
                  />
                </FormField>
                <FormField label="Lab Address">
                  <Input
                    type="text"
                    value={labAddress}
                    onChange={e => setLabAddress(e.target.value)}
                    disabled={!editing}
                    fullWidth
                  />
                </FormField>
                <FormField label="Lab City">
                  <Input
                    type="text"
                    value={labCity}
                    onChange={e => setLabCity(e.target.value)}
                    disabled={!editing}
                    fullWidth
                  />
                </FormField>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

DashboardProfile.displayName = "DashboardProfile";
export default DashboardProfile;
