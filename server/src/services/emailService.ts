import nodemailer from "nodemailer";

interface UserEmailData {
  email: string;
  code: string;
  userName?: string;
}

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const generateVerificationCode = (): string =>
  Math.floor(100000 + Math.random() * 900000).toString();

const extractUserName = (email: string, fullName = ""): string => {
  if (fullName && fullName.trim() !== "") {
    return fullName;
  }
  const parts = email.split("@");
  return parts[0] ?? email;
};

interface SendEmailOptions {
  email: string;
  subject: string;
  htmlContent: string;
  textContent: string;
}

const sendEmail = async (options: SendEmailOptions) => {
  const { email, subject, htmlContent, textContent } = options;

  const mailOptions = {
    from: `"${process.env.COMPANY_NAME || "Kanjo"}" <${process.env.EMAIL_FROM ?? "noreply@example.com"}>`,
    to: email,
    subject,
    html: htmlContent,
    text: textContent,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    throw new Error(
      `Email could not be sent: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
};

export const sendVerificationCode = async (
  userData: UserEmailData,
): Promise<{ success: boolean; messageId?: string }> => {
  if (process.env.SEND_MSG_METHOD === "ONLINE") {
    const { email, code, userName } = userData;
    const extractedUserName = extractUserName(email, userName);
    const companyName = process.env.COMPANY_NAME || "Kanjo";

    return sendEmail({
      email,
      subject: `Your Verification Code - ${companyName}`,
      htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hello ${extractedUserName},</h2>
        <p>Use the 6-digit code below to verify your account:</p>
        <div style="background: #f4f4f4; padding: 20px; text-align: center; font-size: 32px; 
                    letter-spacing: 8px; font-weight: bold; border-radius: 8px; margin: 20px 0;">
          ${code}
        </div>
        <p>This code is valid for 10 minutes.</p>
        <p>If you did not create this account, you can ignore this email.</p>
        <br>
        <p>Best regards,<br>The ${companyName} Team</p>
      </div>`,
      textContent: `Hello ${extractedUserName},

Use the following code to verify your account: ${code}

This code is valid for 10 minutes.

If you did not create this account, you can ignore this email.

Best regards,
The ${companyName} Team`,
    });
  }

  if (process.env.SEND_MSG_METHOD === "OFFLINE") {
    console.log(userData.code);
    return { success: true };
  }

  return { success: false };
};

export const sendPasswordResetEmail = async (
  userData: UserEmailData,
): Promise<{ success: boolean; messageId?: string }> => {
  if (process.env.SEND_MSG_METHOD === "ONLINE") {
    const { email, code, userName } = userData;
    const extractedUserName = extractUserName(email, userName);
    const companyName = process.env.COMPANY_NAME || "Kanjo";

    return sendEmail({
      email,
      subject: `Your Password Reset Code - ${companyName}`,
      htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Hello ${extractedUserName},</h2>
        <p>Use the 6-digit code below to reset your password:</p>
        <div style="background: #f4f4f4; padding: 20px; text-align: center; font-size: 32px; 
                    letter-spacing: 8px; font-weight: bold; border-radius: 8px; margin: 20px 0;">
          ${code}
        </div>
        <p>This code is valid for 10 minutes.</p>
        <p>If you did not request a password reset, you can ignore this email.</p>
        <br>
        <p>Best regards,<br>The ${companyName} Team</p>
      </div>`,
      textContent: `Hello ${extractedUserName},

Use the following code to reset your password: ${code}

This code is valid for 10 minutes.

If you did not request a password reset, you can ignore this email.

Best regards,
The ${companyName} Team`,
    });
  }

  if (process.env.SEND_MSG_METHOD === "OFFLINE") {
    console.log(userData.code);
    return { success: true };
  }

  return { success: false };
};
