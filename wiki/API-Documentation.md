# API Documentation

**Base URL:** `http://localhost:3000/api/v1`

All endpoints return JSON responses. Authentication is handled via **httpOnly cookies** (set automatically) with a **Bearer token** fallback for non-browser clients.

---

## Table of Contents

- [Authentication](#authentication)
  - [Register](#1-register)
  - [Login](#2-login)
  - [Verify Email](#3-verify-email)
  - [Resend Verification Code](#4-resend-verification-code)
  - [Logout](#5-logout)
  - [Forgot Password](#6-forgot-password)
  - [Reset Password](#7-reset-password)
- [User](#user)
  - [Complete Profile](#8-complete-profile)
  - [Change Password](#9-change-password)
- [Dentist](#dentist)
  - [Get Dentist Profile](#10-get-dentist-profile)
  - [Update Dentist Profile](#11-update-dentist-profile)
- [Technician](#technician)
  - [Get Technician Profile](#12-get-technician-profile)
  - [Update Technician Profile](#13-update-technician-profile)
- [Error Handling](#error-handling)

---

## Authentication

All auth endpoints are under `/api/v1/user`.

---

### 1. Register

**`POST /api/v1/user/register`**

Creates a new user account and sends a 6-digit verification code via email (or logs it to console in OFFLINE mode). A JWT token is set in the `token` cookie.

#### Request Body

```json
{
  "email": "dentist@example.com",
  "password": "Password1"
}
```

| Field | Type | Rules |
|-------|------|-------|
| `email` | string | Required, valid email format |
| `password` | string | Required, min 8 chars, must contain uppercase letter + number |

#### Success Response (201)

```json
{
  "status": "success",
  "message": "Registration successful! Please check your email for the 6-digit verification code.",
  "data": {
    "user": {
      "id": 1,
      "email": "dentist@example.com",
      "role": null,
      "isProfileComplete": false,
      "isVerified": false,
      "createdAt": "2025-05-17T10:00:00.000Z",
      "updatedAt": "2025-05-17T10:00:00.000Z"
    }
  }
}
```

#### Error Responses

| Status | Message |
|--------|---------|
| `400` | User already exists with this email |
| `400` | Password must be at least 8 characters / must contain uppercase letter / must contain a number |

---

### 2. Login

**`POST /api/v1/user/login`**

Authenticates an existing user. Requires the email to be verified first.

#### Request Body

```json
{
  "email": "dentist@example.com",
  "password": "Password1"
}
```

#### Success Response (200)

```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "dentist@example.com",
      "role": null,
      "isProfileComplete": false,
      "isVerified": true,
      "createdAt": "2025-05-17T10:00:00.000Z",
      "updatedAt": "2025-05-17T10:00:00.000Z"
    }
  }
}
```

#### Error Responses

| Status | Message |
|--------|---------|
| `400` | Please provide email and password |
| `401` | Incorrect email or password |
| `403` | Please verify your email address before logging in |

---

### 3. Verify Email

**`POST /api/v1/user/verify-email`**

Verifies the user's email using the 6-digit code sent during registration. Requires the `softProtect` middleware (user must have a valid JWT token from registration). Issues a **new token** with `isVerified: true`.

#### Request Body

```json
{
  "verificationCode": "483291"
}
```

| Field | Type | Rules |
|-------|------|-------|
| `verificationCode` | string | Required, 6 digits |

#### Success Response (200)

```json
{
  "status": "success",
  "message": "Email verified successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "dentist@example.com",
      "isVerified": true
    }
  }
}
```

#### Error Responses

| Status | Message |
|--------|---------|
| `400` | Invalid verification code |
| `400` | Verification code has expired |
| `400` | Email already verified |
| `404` | User not found |

---

### 4. Resend Verification Code

**`POST /api/v1/user/resend-code`**

Resends a new 6-digit verification code to the user's email. Requires a valid JWT token.

#### Request Body

None.

#### Success Response (200)

```json
{
  "status": "success",
  "message": "New verification code sent to your email"
}
```

#### Error Responses

| Status | Message |
|--------|---------|
| `400` | Email already verified |
| `404` | User not found |

---

### 5. Logout

**`POST /api/v1/user/logout`**

Clears the JWT `token` cookie. Requires authentication.

#### Success Response (200)

```json
{
  "status": "success",
  "message": "Logged out successfully"
}
```

---

### 6. Forgot Password

**`POST /api/v1/user/forgot-password`**

Sends a 6-digit password reset code to the user's email. Always returns success even if the email doesn't exist (to prevent email enumeration).

#### Request Body

```json
{
  "email": "dentist@example.com"
}
```

#### Success Response (200)

```json
{
  "status": "success",
  "message": "If the email exists, a reset code will be sent"
}
```

#### Error Responses

| Status | Message |
|--------|---------|
| `400` | Please verify your email first |

---

### 7. Reset Password

**`POST /api/v1/user/reset-password`**

Resets the password using the 6-digit code sent via email.

#### Request Body

```json
{
  "email": "dentist@example.com",
  "code": "583902",
  "newPassword": "NewPass123"
}
```

| Field | Type | Rules |
|-------|------|-------|
| `email` | string | Required, valid email |
| `code` | string | Required, exactly 6 digits |
| `newPassword` | string | Required, min 8 chars, must contain uppercase + number |

#### Success Response (200)

```json
{
  "status": "success",
  "message": "Password reset successful. You can now login with your new password."
}
```

#### Error Responses

| Status | Message |
|--------|---------|
| `400` | Invalid reset request |
| `400` | Invalid reset code |
| `400` | Reset code has expired. Please request a new one. |

---

## User

### 8. Complete Profile

**`POST /api/v1/user/complete-profile`**

Completes the user's profile by assigning a role (DENTIST or LAB_TECHNICIAN) and creating the corresponding profile record in a single database transaction. Requires authentication and email verification.

#### Request Body (Dentist)

```json
{
  "role": "DENTIST",
  "fullName": "Dr. Ahmet Yılmaz",
  "phone": "+905551234567",
  "clinicName": "Yılmaz Ağız ve Diş Sağlığı",
  "clinicAddress": "Atatürk Cad. No:42, Kadıköy",
  "clinicCity": "İstanbul"
}
```

#### Request Body (Lab Technician)

```json
{
  "role": "LAB_TECHNICIAN",
  "fullName": "Ali Demir",
  "phone": "+905557654321",
  "labName": "Demir Dental Laboratuvar",
  "labAddress": "Sanayi Mah. No:15, Ostim",
  "labCity": "Ankara"
}
```

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `role` | string | Yes | Must be `DENTIST` or `LAB_TECHNICIAN` |
| `fullName` | string | Yes | Min 2 characters |
| `phone` | string | Yes | Must be valid phone format |
| `clinicName` | string | Yes (if DENTIST) | — |
| `clinicAddress` | string | No | — |
| `clinicCity` | string | No | — |
| `labName` | string | Yes (if LAB_TECHNICIAN) | — |
| `labAddress` | string | No | — |
| `labCity` | string | No | — |

#### Success Response (200)

```json
{
  "status": "success",
  "message": "Profile completed successfully",
  "data": {
    "role": "DENTIST",
    "profile": {
      "id": 1,
      "userId": 1,
      "fullName": "Dr. Ahmet Yılmaz",
      "phone": "+905551234567",
      "clinicName": "Yılmaz Ağız ve Diş Sağlığı",
      "clinicAddress": "Atatürk Cad. No:42, Kadıköy",
      "clinicCity": "İstanbul",
      "createdAt": "2025-05-17T10:05:00.000Z",
      "updatedAt": "2025-05-17T10:05:00.000Z"
    }
  }
}
```

#### Error Responses

| Status | Message |
|--------|---------|
| `400` | Profile is already complete |
| `400` | Please verify your email first |

---

### 9. Change Password

**`PUT /api/v1/user/change-password`**

Changes the password for the authenticated user. Requires the current password.

#### Request Body

```json
{
  "currentPassword": "Password1",
  "newPassword": "NewPassword2"
}
```

| Field | Type | Rules |
|-------|------|-------|
| `currentPassword` | string | Required |
| `newPassword` | string | Required, min 8 chars, must contain uppercase + number |

#### Success Response (200)

```json
{
  "status": "success",
  "message": "Password changed successfully"
}
```

#### Error Responses

| Status | Message |
|--------|---------|
| `401` | Current password is incorrect |
| `400` | New password must be different from current password |

---

## Dentist

All dentist endpoints require authentication. They are under `/api/v1/dentist`.

---

### 10. Get Dentist Profile

**`GET /api/v1/dentist/profile`**

Returns the authenticated user's dentist profile, including associated user data.

#### Success Response (200)

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "userId": 1,
    "fullName": "Dr. Ahmet Yılmaz",
    "phone": "+905551234567",
    "clinicName": "Yılmaz Ağız ve Diş Sağlığı",
    "clinicAddress": "Atatürk Cad. No:42, Kadıköy",
    "clinicCity": "İstanbul",
    "createdAt": "2025-05-17T10:05:00.000Z",
    "updatedAt": "2025-05-17T10:05:00.000Z",
    "user": {
      "id": 1,
      "email": "dentist@example.com",
      "role": "DENTIST",
      "isVerified": true,
      "isProfileComplete": true,
      "createdAt": "2025-05-17T10:00:00.000Z",
      "updatedAt": "2025-05-17T10:05:00.000Z"
    }
  }
}
```

---

### 11. Update Dentist Profile

**`PUT /api/v1/dentist/profile`**

Updates the authenticated dentist's profile. All fields are optional (only provided fields are updated).

#### Request Body

```json
{
  "fullName": "Dr. Ahmet Yılmaz Güncel",
  "phone": "+905559999999",
  "clinicName": "Yılmaz Diş Polikliniği",
  "clinicAddress": "Bağdat Cad. No:100, Maltepe",
  "clinicCity": "İstanbul"
}
```

#### Success Response (200)

```json
{
  "status": "success",
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "userId": 1,
    "fullName": "Dr. Ahmet Yılmaz Güncel",
    "phone": "+905559999999",
    "clinicName": "Yılmaz Diş Polikliniği",
    "clinicAddress": "Bağdat Cad. No:100, Maltepe",
    "clinicCity": "İstanbul",
    "createdAt": "2025-05-17T10:05:00.000Z",
    "updatedAt": "2025-05-17T10:10:00.000Z"
  }
}
```

---

## Technician

All technician endpoints require authentication. They are under `/api/v1/technician`.

---

### 12. Get Technician Profile

**`GET /api/v1/technician/profile`**

Returns the authenticated user's technician profile, including associated user data.

#### Success Response (200)

```json
{
  "status": "success",
  "data": {
    "id": 1,
    "userId": 2,
    "fullName": "Ali Demir",
    "phone": "+905557654321",
    "labName": "Demir Dental Laboratuvar",
    "labAddress": "Sanayi Mah. No:15, Ostim",
    "labCity": "Ankara",
    "specialties": [],
    "createdAt": "2025-05-17T10:06:00.000Z",
    "updatedAt": "2025-05-17T10:06:00.000Z",
    "user": {
      "id": 2,
      "email": "technician@example.com",
      "role": "LAB_TECHNICIAN",
      "isVerified": true,
      "isProfileComplete": true,
      "createdAt": "2025-05-17T10:02:00.000Z",
      "updatedAt": "2025-05-17T10:06:00.000Z"
    }
  }
}
```

---

### 13. Update Technician Profile

**`PUT /api/v1/technician/profile`**

Updates the authenticated technician's profile. All fields are optional.

#### Request Body

```json
{
  "fullName": "Ali Demir Güncel",
  "phone": "+905551111111",
  "labName": "Demir Premium Dental Lab",
  "labAddress": "Yeni Sanayi Sitesi No:88, Ostim",
  "labCity": "Ankara"
}
```

#### Success Response (200)

```json
{
  "status": "success",
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "userId": 2,
    "fullName": "Ali Demir Güncel",
    "phone": "+905551111111",
    "labName": "Demir Premium Dental Lab",
    "labAddress": "Yeni Sanayi Sitesi No:88, Ostim",
    "labCity": "Ankara",
    "specialties": [],
    "createdAt": "2025-05-17T10:06:00.000Z",
    "updatedAt": "2025-05-17T10:12:00.000Z"
  }
}
```

---

## Authentication Flow Summary

```
                    REGISTER
                        │
                        ▼
            ┌───────────────────────┐
            │  Email Verification    │ ← 6-digit code via email/console
            │  POST /user/verify-email
            └───────────┬───────────┘
                        │
                        ▼
            ┌───────────────────────┐
            │  Complete Profile      │
            │  POST /user/complete-profile
            │  (Choose DENTIST or LAB_TECHNICIAN)
            └───────────┬───────────┘
                        │
                        ▼
                  ┌───────────┐
                  │ DASHBOARD │
                  └───────────┘
```

---

## Error Handling

All errors follow a consistent format:

### Development Mode

```json
{
  "status": "fail",
  "error": {
    "statusCode": 400,
    "status": "fail",
    "isOperational": true
  },
  "message": "Error description",
  "stack": "Error stack trace..."
}
```

### Production Mode

```json
{
  "status": "fail",
  "message": "Error description"
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| `200` | Success |
| `201` | Created (registration) |
| `400` | Bad Request (validation error, invalid input) |
| `401` | Unauthorized (missing/invalid credentials) |
| `403` | Forbidden (email not verified, wrong role) |
| `404` | Not Found (user/profile not found) |
| `500` | Internal Server Error |
