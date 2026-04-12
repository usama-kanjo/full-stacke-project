const nodemailer = require('nodemailer');
const crypto = require('crypto');

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

// 6 haneli OTP kodu üret
exports.generateVerificationCode = () => {
  // 100000 - 999999 arası rastgele sayı (6 haneli)
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Extract username from email
const extractUserName = (email, fullName = '') => {
  if (fullName && fullName.trim() !== '') {
    return fullName;
  }
  return email.split('@')[0];
};

// Send verification CODE (OTP) via email
exports.sendVerificationCode = async (userData) => {
  const {
    email,
    code, // 6 haneli kod
    userName = '',
  } = userData;

  const extractedUserName = extractUserName(email, userName);

  const mailOptions = {
    from: `"${process.env.COMPANY_NAME || 'Kanjo'}" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: `Doğrulama Kodunuz - ${process.env.COMPANY_NAME || 'Kanjo'}`,
    html: `
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
        <p>İyi günler,<br>${process.env.COMPANY_NAME || 'Kanjo'} Ekibi</p>
      </div>
    `,
    text: `Merhaba ${extractedUserName},

Hesabınızı doğrulamak için kodunuz: ${code}

Bu kod 10 dakika geçerlidir.

Eğer bu hesabı siz oluşturmadıysanız, bu emaili görmezden gelebilirsiniz.

İyi günler,
${process.env.COMPANY_NAME || 'Kanjo'} Ekibi`
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return {
      success: true,
      messageId: result.messageId,
    };
  } catch (error) {
    throw new Error(`Email could not be sent: ${error.message}`);
  }
};
