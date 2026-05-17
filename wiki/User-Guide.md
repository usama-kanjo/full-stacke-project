# User Guide

This guide explains how to use the kanjoLab platform from end to end.

---

## Getting Started

### 1. Create an Account

1. Navigate to **http://localhost:3001**
2. Click the **"Kayıt Ol"** (Sign Up) button
3. Enter your **email address** and a **password**
   - Password must be at least 8 characters
   - Must contain at least one uppercase letter
   - Must contain at least one number
4. Click **"Kayıt Ol"**

> After registration, you will be automatically logged in and redirected to the email verification page.

### 2. Verify Your Email

After registration, a 6-digit verification code is sent to your email.

- **If using OFFLINE mode** (`SEND_MSG_METOD=OFFLINE`): Check the server console for the code. It will be printed as a 6-digit number.
- **If using ONLINE mode**: Check your email inbox (and spam folder).

Enter the 6-digit code on the verification page to activate your account.

> You can request a new code if the previous one expired by clicking the resend button.

### 3. Complete Your Profile

After email verification, you must complete your profile:

#### If you are a Dentist (Dişçi):

| Field | Required | Description |
|-------|----------|-------------|
| Role | Yes | Select **DENTIST** |
| Full Name | Yes | Your name and surname |
| Phone | Yes | Your contact number |
| Clinic Name | Yes | Your clinic's name |
| Clinic Address | No | Clinic street address |
| Clinic City | No | City where your clinic is located |

#### If you are a Lab Technician (Laborant):

| Field | Required | Description |
|-------|----------|-------------|
| Role | Yes | Select **LAB_TECHNICIAN** |
| Full Name | Yes | Your name and surname |
| Phone | Yes | Your contact number |
| Lab Name | Yes | Your laboratory's name |
| Lab Address | No | Lab street address |
| Lab City | No | City where your lab is located |

### 4. Login

Once your profile is complete, you can log in anytime using your email and password. The system uses **httpOnly cookies** for authentication — your browser handles the token automatically.

---

## Dashboard

The dashboard provides a role-based interface. Currently, the dashboard shows placeholder data while order management features are under development.

### Navigation

| Menu Item | Description |
|-----------|-------------|
| **Dashboard** | Main overview page |
| **Profile** | View and edit your profile information |
| **Settings** | Account settings |

---

## Managing Your Profile

### View Profile

Navigate to the **Profile** page in the dashboard to view your current profile information, including your user details and role-specific fields (clinic or lab info).

### Edit Profile

On the **Profile** page, you can update your:
- Full name
- Phone number
- Clinic/Lab name
- Clinic/Lab address
- Clinic/Lab city

---

## Password Management

### Change Password

To change your password while logged in:

1. Go to **Settings** in the dashboard
2. Enter your **current password**
3. Enter your **new password** (must contain uppercase letter + number, min 8 chars)
4. Confirm the change

### Forgot Password

If you forgot your password:

1. On the login page, click **"Şifremi Unuttum"** (Forgot Password)
2. Enter your email address
3. Check your email (or server console in OFFLINE mode) for a 6-digit reset code
4. Enter the code and your new password
5. Log in with your new password

---

## User Flow Diagram

```
                    ┌─────────────┐
                    │  Home Page  │
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │  Register   │
                    │  (Email +   │
                    │   Password) │
                    └──────┬──────┘
                           │
                    ┌──────▼──────────┐
                    │  Email Verify   │ ← 6-digit code
                    │  (Enter Code)   │
                    └──────┬──────────┘
                           │
                    ┌──────▼──────────────┐
                    │  Complete Profile   │
                    │  (Choose Role +     │
                    │   Fill Details)     │
                    └──────┬──────────────┘
                           │
                    ┌──────▼──────┐
                    │  Dashboard │
                    └─────────────┘
```

---

## Development Tips

### OFFLINE Email Mode

When running the server with `npm run dev:offline`, all verification and reset codes are printed to the terminal console where the server is running. Look for lines like:

```
New user registered: dentist@example.com
Verification code: 483291
```

Or for password reset:

```
Password reset requested: dentist@example.com
Reset code: 748302
```

### Prisma Studio

You can view and edit database records directly using Prisma Studio:

```bash
cd server
npm run db:studio
```

This opens a web interface at `http://localhost:5555`.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Cannot register | Ensure password meets requirements (8+ chars, uppercase, number) |
| Verification code not received | Use `SEND_MSG_METOD=OFFLINE` mode and check server console |
| Code expired | Click "Resend Code" on the verification page |
| Login fails | Make sure your email is verified first |
| Profile completion fails | Verify your email before completing your profile |
| 401 errors | Your session may have expired — log in again |
