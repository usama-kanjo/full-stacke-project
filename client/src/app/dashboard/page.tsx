"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { DashboardHome } from "@/components/organisms/DashboardHome";
import { ProfileCompletionForm } from "@/components/organisms/ProfileCompletionForm";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/services/authService";

export default function DashboardPage() {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkingProfile, setCheckingProfile] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
    if (user.isProfileComplete === false) {
      setShowProfileModal(true);
    }
    setCheckingProfile(false);
  }, [user, router]);

  const handleProfileSubmit = useCallback(async (data: Parameters<typeof authService.completeProfile>[0]) => {
    setIsSubmitting(true);
    try {
      const res = await authService.completeProfile(data);
      setUser({
        ...user!,
        role: res.data.data.role,
        isProfileComplete: true,
      });
      setShowProfileModal(false);
      toast.success("Profil başarıyla tamamlandı!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Profil tamamlanamadı");
    } finally {
      setIsSubmitting(false);
    }
  }, [user, setUser]);

  if (checkingProfile)
  { return null; }

  return (
    <>
      <DashboardHome />
      <ProfileCompletionForm
        open={showProfileModal}
        onClose={() => {}}
        onSubmit={handleProfileSubmit}
        isLoading={isSubmitting}
      />
    </>
  );
}
