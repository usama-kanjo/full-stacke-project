import bcrypt from "bcryptjs";
import { prisma } from "../config/database.js";
import { ApiError } from "../utils/apiError.js";

interface ProfileData {
  role?: string;
  fullName?: string;
  phone?: string;
  clinicName?: string;
  clinicAddress?: string;
  clinicCity?: string;
  labName?: string;
  labAddress?: string;
  labCity?: string;
}

export const completeProfile = async (
  userId: number,
  profileData: ProfileData,
) => {
  const {
    role,
    fullName,
    phone,
    clinicName,
    clinicAddress,
    clinicCity,
    labName,
    labAddress,
    labCity,
  } = profileData;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  if (user.isProfileComplete) {
    throw new ApiError("Profile is already complete", 400);
  }

  if (!user.isVerified) {
    throw new ApiError("Please verify your email first", 400);
  }

  const result = await prisma.$transaction(async (tx) => {
    let profile;

    if (role === "DENTIST") {
      profile = await tx.dentist.create({
        data: {
          userId: user.id,
          fullName: fullName ?? "",
          phone: phone ?? "",
          clinicName: clinicName ?? "",
          clinicAddress: clinicAddress || null,
          clinicCity: clinicCity || null,
        },
      });
    } else if (role === "LAB_TECHNICIAN") {
      profile = await tx.technician.create({
        data: {
          userId: user.id,
          fullName: fullName ?? "",
          phone: phone ?? "",
          labName: labName ?? "",
          labAddress: labAddress || null,
          labCity: labCity || null,
        },
      });
    }

    await tx.user.update({
      where: { id: user.id },
      data: {
        role: role as "DENTIST" | "LAB_TECHNICIAN",
        isProfileComplete: true,
      },
    });

    return profile;
  });

  if (process.env.NODE_ENV === "development") {
    console.log("Profile completed for user:", user.email, "as", role);
  }

  return {
    status: "success",
    message: "Profile completed successfully",
    data: { role, profile: result },
  };
};

export const changePassword = async (
  userId: number,
  currentPassword: string,
  newPassword: string,
) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new ApiError("User not found", 404);
  }

  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.passwordHash,
  );
  if (!isCurrentPasswordValid) {
    throw new ApiError("Current password is incorrect", 401);
  }

  const isNewPasswordSame = await bcrypt.compare(
    newPassword,
    user.passwordHash,
  );
  if (isNewPasswordSame) {
    throw new ApiError(
      "New password must be different from current password",
      400,
    );
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: hashedNewPassword },
  });

  if (process.env.NODE_ENV === "development") {
    console.log("User password changed:", user.email);
  }

  return {
    status: "success",
    message: "Password changed successfully",
  };
};
