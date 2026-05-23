import { z } from "zod";

export const profileCompletionSchema = z
  .object({
    role: z.enum(["DENTIST", "LAB_TECHNICIAN"], {
      message: "Lütfen bir rol seçin",
    }),
    fullName: z
      .string()
      .min(2, "İsim en az 2 karakter olmalıdır"),
    phone: z.string().min(1, "Telefon numarası gereklidir"),
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
        message: "Klinik adı gereklidir",
      });
    }
    if (data.role === "LAB_TECHNICIAN" && !data.labName) {
      ctx.addIssue({
        code: "custom",
        path: ["labName"],
        message: "Laboratuvar adı gereklidir",
      });
    }
  });
