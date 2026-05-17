import { prisma } from "../config/database.js";
import ApiError from "../utils/apiError.js";

interface UpdateData {
  fullName?: string;
  phone?: string;
  clinicName?: string;
  clinicAddress?: string;
  clinicCity?: string;
}

export const getProfile = async (userId: number) => {
  const dentist = await prisma.dentist.findUnique({
    where: { userId },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          role: true,
          isVerified: true,
          isProfileComplete: true,
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  if (!dentist) {
    throw new ApiError("Dentist profile not found", 404);
  }

  return { status: "success", data: dentist };
};

export const updateProfile = async (userId: number, updateData: UpdateData) => {
  const { fullName, phone, clinicName, clinicAddress, clinicCity } = updateData;

  const existingDentist = await prisma.dentist.findUnique({
    where: { userId },
  });

  if (!existingDentist) {
    throw new ApiError("Dentist profile not found", 404);
  }

  const dentist = await prisma.dentist.update({
    where: { userId },
    data: {
      ...(fullName && { fullName }),
      ...(phone && { phone }),
      ...(clinicName && { clinicName }),
      ...(clinicAddress !== undefined && { clinicAddress }),
      ...(clinicCity !== undefined && { clinicCity }),
    },
  });

  if (process.env.NODE_ENV === "development") {
    console.log("Dentist profile updated:", userId);
  }

  return {
    status: "success",
    message: "Profile updated successfully",
    data: dentist,
  };
};
