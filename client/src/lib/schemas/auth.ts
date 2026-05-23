import { z } from "zod";

export const emailSchema = z.string().email("Geçerli bir email adresi girin");

export const passwordSchema = z
  .string()
  .min(8, "Şifre en az 8 karakter olmalıdır")
  .regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
  .regex(/[0-9]/, "Şifre en az bir rakam içermelidir");

export const verificationCodeSchema = z
  .string()
  .length(6, "6 haneli doğrulama kodu gereklidir")
  .regex(/^\d{6}$/, "Doğrulama kodu yalnızca rakamlardan oluşmalıdır");

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Şifre gereklidir"),
});

export const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Şifre tekrarı gereklidir"),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

export const verifyEmailSchema = z.object({
  verificationCode: verificationCodeSchema,
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    code: verificationCodeSchema,
    newPassword: passwordSchema,
    confirmPassword: z.string().min(1, "Şifre tekrarı gereklidir"),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });
