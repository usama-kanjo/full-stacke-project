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
      subject: `Doğrulama Kodunuz - ${companyName}`,
      htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Merhaba ${extractedUserName},</h2>
        <p>Hesabınızı doğrulamak için aşağıdaki 6 haneli kodu kullanın:</p>
        <div style="background: #f4f4f4; padding: 20px; text-align: center; font-size: 32px; 
                    letter-spacing: 8px; font-weight: bold; border-radius: 8px; margin: 20px 0;">
          ${code}
        </div>
        <p>Bu kod 10 dakika geçerlidir.</p>
        <p>Eğer bu hesabı siz oluşturmadıysanız, bu emaili görmezden gelebilirsiniz.</p>
        <br>
        <p>İyi günler,<br>${companyName} Ekibi</p>
      </div>`,
      textContent: `Merhaba ${extractedUserName},

Hesabınızı doğrulamak için kodunuz: ${code}

Bu kod 10 dakika geçerlidir.

Eğer bu hesabı siz oluşturmadıysanız, bu emaili görmezden gelebilirsiniz.

İyi günler,
${companyName} Ekibi`,
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
      subject: `Şifre Sıfırlama Kodunuz - ${companyName}`,
      htmlContent: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Merhaba ${extractedUserName},</h2>
        <p>Şifrenizi sıfırlamak için aşağıdaki 6 haneli kodu kullanın:</p>
        <div style="background: #f4f4f4; padding: 20px; text-align: center; font-size: 32px; 
                    letter-spacing: 8px; font-weight: bold; border-radius: 8px; margin: 20px 0;">
          ${code}
        </div>
        <p>Bu kod 10 dakika geçerlidir.</p>
        <p>Eğer şifre sıfırlama talebinde bulunmadıysanız, bu emaili görmezden gelebilirsiniz.</p>
        <br>
        <p>İyi günler,<br>${companyName} Ekibi</p>
      </div>`,
      textContent: `Merhaba ${extractedUserName},

Şifrenizi sıfırlamak için kodunuz: ${code}

Bu kod 10 dakika geçerlidir.

Eğer şifre sıfırlama talebinde bulunmadıysanız, bu emaili görmezden gelebilirsiniz.

İyi günler,
${companyName} Ekibi`,
    });
  }

  if (process.env.SEND_MSG_METHOD === "OFFLINE") {
    console.log(userData.code);
    return { success: true };
  }

  return { success: false };
};
