const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { verificationTemplate } = require('../emails/templates');

// Create email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Generate verification token
exports.generateVerificationToken = () => {
  return crypto.randomBytes(20).toString('hex');
};

// Extract username from email
const extractUserName = (email, fullName = '') => {
  if (fullName && fullName.trim() !== '') {
    return fullName;
  }
  return email.split('@')[0];
};

// Detect dark mode preference (simple version)
const detectDarkModePreference = (userAgent) => {
  // You can develop this part according to your user preferences
  // Example: You can get dark mode preference from user profile
  const darkModeKeywords = ['dark', 'night', 'midnight'];
  return darkModeKeywords.some(keyword =>
    userAgent.toLowerCase().includes(keyword)
  );
};

// Send verification email
exports.sendVerificationEmail = async (userData) => {
  const {
    email,
    token,
    userName = '',
    userAgent = '',
    userPreferences = {}
  } = userData;

  const verificationUrl = `${process.env.BASE_URL}/verify-email/${token}`;
  const extractedUserName = extractUserName(email, userName);
  const enableDarkMode = userPreferences.darkMode || detectDarkModePreference(userAgent);
  const currentYear = new Date().getFullYear();

  // Template options
  const templateOptions = {
    verificationUrl,
    userName: extractedUserName,
    userEmail: email,
    baseUrl: process.env.BASE_URL || 'https://kanjo.com',
    supportEmail: process.env.SUPPORT_EMAIL || 'support@kanjo.com',
    companyName: process.env.COMPANY_NAME || 'Kanjo Company',
    logoUrl: process.env.LOGO_URL || 'https://kanjo.com/logo.png',
    enableDarkMode,
    currentYear
  };

  const mailOptions = {
    from: `"${templateOptions.companyName}" <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: `📧 ${templateOptions.companyName} - Verify Your Email Address`,
    html: verificationTemplate(templateOptions),
    // Also add text version
    text: `
Hello ${extractedUserName}!

Please click the link below to activate your ${templateOptions.companyName} account:

${verificationUrl}

This link is valid for 24 hours.

If you did not create this account, please ignore this email.

Best regards,
${templateOptions.companyName} Team
${templateOptions.baseUrl}
    `.trim()
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    // console.log(`✅ Verification email sent: ${email}`, {
    //  userName: extractedUserName,
    //   darkMode: enableDarkMode,
    //   messageId: result.messageId
    // });

    return {
      success: true,
      messageId: result.messageId,
      darkMode: enableDarkMode
    };
  } catch (error) {
    // console.error('❌ Email sending error:', error);
    throw new Error(`Email could not be sent: ${error.message}`);
  }
};

// For bulk email sending
exports.sendBulkVerificationEmails = async (usersData) => {
  const results = [];

  for (const userData of usersData) {
    try {
      const result = await this.sendVerificationEmail(userData);
      results.push({ success: true, email: userData.email, ...result });
    } catch (error) {
      results.push({ success: false, email: userData.email, error: error.message });
    }
  }

  return results;
};
