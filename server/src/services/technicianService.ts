import { prisma } from "../config/database.js";
import ApiError from "../utils/apiError.js";

interface UpdateData {
  fullName?: string;
  phone?: string;
  labName?: string;
  labAddress?: string;
  labCity?: string;
}

export const getProfile = async (userId: number) => {
  const technician = await prisma.technician.findUnique({
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

  if (!technician) {
    throw new ApiError("Technician profile not found", 404);
  }

  return { status: "success", data: technician };
};

export const updateProfile = async (userId: number, updateData: UpdateData) => {
  const { fullName, phone, labName, labAddress, labCity } = updateData;

  const existingTechnician = await prisma.technician.findUnique({
    where: { userId },
  });

  if (!existingTechnician) {
    throw new ApiError("Technician profile not found", 404);
  }

  const technician = await prisma.technician.update({
    where: { userId },
    data: {
      ...(fullName && { fullName }),
      ...(phone && { phone }),
      ...(labName && { labName }),
      ...(labAddress !== undefined && { labAddress }),
      ...(labCity !== undefined && { labCity }),
    },
  });

  if (process.env.NODE_ENV === "development") {
    console.log("Technician profile updated:", userId);
  }

  return {
    status: "success",
    message: "Profile updated successfully",
    data: technician,
  };
};
