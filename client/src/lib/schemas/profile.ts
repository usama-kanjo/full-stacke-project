import { z } from "zod";

const phoneRegex = /^[0-9+\-\s()]+$/;

export const profileCompletionSchema = z
  .object({
    role: z.enum(["DENTIST", "LAB_TECHNICIAN"], {
      message: "Role must be DENTIST or LAB_TECHNICIAN",
    }),
    fullName: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Full name must be at least 2 characters"),
    phone: z
      .string()
      .min(1, "Phone is required")
      .regex(phoneRegex, "Please enter a valid phone number"),
    clinicName: z.string().optional(),
    clinicAddress: z.string().optional(),
    clinicCity: z.string().optional(),
    labName: z.string().optional(),
    labAddress: z.string().optional(),
    labCity: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.role === "DENTIST" && !data.clinicName) {
      ctx.addIssue({
        code: "custom",
        path: ["clinicName"],
        message: "Clinic name is required for Dentist",
      });
    }
    if (data.role === "LAB_TECHNICIAN" && !data.labName) {
      ctx.addIssue({
        code: "custom",
        path: ["labName"],
        message: "Lab name is required for Technician",
      });
    }
  });
