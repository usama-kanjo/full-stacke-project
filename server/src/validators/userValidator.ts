import { check, param } from "express-validator";
import validatorMiddleware from "../middlewares/validatorMiddleware.js";

const isIntegerId = (value: string): boolean => {
  const num = parseInt(value, 10);
  return Number.isInteger(num) && num > 0;
};

export const loginUserValidator = [
  check("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  validatorMiddleware,
];

export const createUserValidator = [
  check("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain a number"),
  validatorMiddleware,
];

export const updateUserValidator = [
  param("id").custom((value) => {
    if (!isIntegerId(value)) {
      throw new Error("Invalid user ID format");
    }
    return true;
  }),
  check("email")
    .optional()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Please provide a valid email"),
  validatorMiddleware,
];

export const getUserValidator = [
  param("id").custom((value) => {
    if (!isIntegerId(value))
    { throw new Error("Invalid user ID format"); }
    return true;
  }),
  validatorMiddleware,
];

export const deleteUserValidator = [
  param("id").custom((value) => {
    if (!isIntegerId(value))
    { throw new Error("Invalid user ID format"); }
    return true;
  }),
  validatorMiddleware,
];

export const changePasswordValidator = [
  check("currentPassword")
    .notEmpty()
    .withMessage("Current password is required"),
  check("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("New password must contain uppercase letter")
    .matches(/[0-9]/)
    .withMessage("New password must contain a number"),
  validatorMiddleware,
];

export const forgotPasswordValidator = [
  check("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  validatorMiddleware,
];

export const resetPasswordValidator = [
  check("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  check("code")
    .notEmpty()
    .withMessage("Reset code is required")
    .isLength({ min: 6, max: 6 })
    .withMessage("Reset code must be 6 digits"),
  check("newPassword")
    .isLength({ min: 8 })
    .withMessage("New password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("New password must contain uppercase letter")
    .matches(/[0-9]/)
    .withMessage("New password must contain a number"),
  validatorMiddleware,
];

export const completeProfileValidator = [
  check("role")
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["DENTIST", "LAB_TECHNICIAN"])
    .withMessage("Role must be DENTIST or LAB_TECHNICIAN"),
  check("fullName")
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 2 })
    .withMessage("Full name must be at least 2 characters"),
  check("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .matches(/^[0-9+\-\s()]+$/)
    .withMessage("Please enter a valid phone number"),
  check("clinicName")
    .if(
      (_value, { req }) =>
        (req as { body: { role: string } }).body.role === "DENTIST",
    )
    .notEmpty()
    .withMessage("Clinic name is required for Dentist"),
  check("clinicAddress").optional({ nullable: true }).trim(),
  check("clinicCity").optional({ nullable: true }).trim(),
  check("labName")
    .if(
      (_value, { req }) =>
        (req as { body: { role: string } }).body.role === "LAB_TECHNICIAN",
    )
    .notEmpty()
    .withMessage("Lab name is required for Technician"),
  check("labAddress").optional({ nullable: true }).trim(),
  check("labCity").optional({ nullable: true }).trim(),
  validatorMiddleware,
];
