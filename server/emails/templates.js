const { emailStyles } = require('./styles');

exports.verificationTemplate = (options) => {
  const {
    verificationUrl,
    userName = 'User',
    userEmail,
    baseUrl = 'https://kanjo.com',
    supportEmail = 'support@kanjo.com',
    companyName = 'Kanjo Company',
    logoUrl = 'https://kanjo/logo.png',
    enableDarkMode = false,
    currentYear = new Date().getFullYear()
  } = options;

  const styles = emailStyles(enableDarkMode);
  const userNameFormatted = userName.split(' ')[0]; // Take only first name

  const generateEmailId = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `${timestamp}-${random}`.toUpperCase();
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification - ${companyName}</title>
    <style>${styles}</style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <div class="logo-section">
                <img src="${logoUrl}" alt="${companyName} Logo" class="logo">
            </div>
            <h1>🎉 Welcome ${userNameFormatted}!</h1>
            <p>There is one last step left to activate your account</p>
        </div>
        
        <div class="email-body">
            <p class="welcome-text">
                Hello <span class="user-name">${userName}</span>!<br>
                Thank you for registering with the address <strong>${userEmail}</strong>.
            </p>
            
            <a href="${verificationUrl}" class="verification-button">
                📧 Verify My Email
            </a>
            
            <div class="verification-link">
                <strong>📎 Alternative link:</strong><br>
                Copy this link to your browser:<br>
                <a href="${verificationUrl}">${verificationUrl}</a>
            </div>
            
            <div class="instructions">
                <h3>📋 How to Complete Verification?</h3>
                <ul>
                    <li>Click the "Verify My Email" button</li>
                    <li>You will be redirected to the verification page</li>
                    <li>Your account will be activated automatically</li>
                    <li>You can start using our services by logging in</li>
                </ul>
            </div>
            
            <div class="instructions">
                <h3>⏰ Important Information</h3>
                <ul>
                    <li>This verification link is valid for <strong>24 hours</strong></li>
                    <li>If the link expires, you can request a new verification email</li>
                    <li>If you encounter any issues: <a href="mailto:${supportEmail}">${supportEmail}</a></li>
                </ul>
            </div>
        </div>
        
        <div class="email-footer">
            <p class="footer-text">
                If you did not request this email, please ignore it.
            </p>
            
            <div class="social-links">
                <a href="${baseUrl}" class="social-link">🌐 Website</a>
                <a href="${baseUrl}/support" class="social-link">📞 Support</a>
                <a href="${baseUrl}/help" class="social-link">❓ Help Center</a>
                <a href="mailto:${supportEmail}" class="social-link">✉️ Email</a>
            </div>
            
            <p class="copyright">
                © ${currentYear} ${companyName}. All rights reserved.<br>
                ${baseUrl} | ${supportEmail}<br>
                <small>Email ID: ${generateEmailId()}</small>
            </p>
            
            ${enableDarkMode ? '<p class="dark-mode-notice">🌙 Displaying in dark mode</p>' : ''}
        </div>
    </div>
</body>
</html>
  `;
};

// You can add other email templates as well
exports.welcomeTemplate = (options) => {
  // Welcome email template
};

exports.passwordResetTemplate = (options) => {
  // Password reset template
};
