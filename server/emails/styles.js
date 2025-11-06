exports.emailStyles = (isDark = false) => {
  const darkModeStyles = isDark ? `
    .email-body { background: #1a1a1a !important; color: #ffffff !important; }
    .welcome-text { color: #e0e0e0 !important; }
    .verification-link { background: #2d2d2d !important; color: #cccccc !important; border-left-color: #667eea !important; }
    .instructions { background: #333300 !important; color: #e6e6cc !important; border-left-color: #ffd700 !important; }
    .email-footer { background: #2d2d2d !important; border-top-color: #404040 !important; }
    .footer-text { color: #a0a0a0 !important; }
  ` : '';

  return `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f4f4f4;
      padding: 20px;
    }
    
    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    
    .email-header {
      background: rgba(255,255,255,0.1);
      padding: 30px 20px;
      text-align: center;
      backdrop-filter: blur(10px);
    }
    
    .email-header h1 {
      color: white;
      font-size: 28px;
      margin-bottom: 10px;
      font-weight: 600;
    }
    
    .email-header p {
      color: rgba(255,255,255,0.8);
      font-size: 16px;
    }
    
    .logo-section {
      text-align: center;
      margin-bottom: 20px;
    }
    
    .logo {
      max-width: 150px;
      height: auto;
      border-radius: 10px;
    }
    
    .email-body {
      background: white;
      padding: 40px 30px;
      transition: all 0.3s ease;
    }
    
    .welcome-text {
      font-size: 18px;
      color: #555;
      margin-bottom: 25px;
      text-align: center;
    }
    
    .user-name {
      color: #667eea;
      font-weight: bold;
    }
    
    .verification-button {
      display: block;
      width: 250px;
      margin: 30px auto;
      padding: 15px 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-decoration: none;
      border-radius: 50px;
      font-weight: bold;
      font-size: 16px;
      text-align: center;
      transition: all 0.3s ease;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    }
    
    .verification-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }
    
    .verification-link {
      word-break: break-all;
      background: #f8f9fa;
      padding: 15px;
      border-radius: 8px;
      border-left: 4px solid #667eea;
      margin: 20px 0;
      font-size: 14px;
      color: #666;
      transition: all 0.3s ease;
    }
    
    .instructions {
      background: #fff9e6;
      padding: 20px;
      border-radius: 10px;
      border-left: 4px solid #ffd700;
      margin: 25px 0;
      transition: all 0.3s ease;
    }
    
    .instructions h3 {
      color: #b8860b;
      margin-bottom: 10px;
    }
    
    .instructions ul {
      padding-left: 20px;
    }
    
    .instructions li {
      margin-bottom: 8px;
      color: #666;
    }
    
    .email-footer {
      background: #f8f9fa;
      padding: 25px;
      text-align: center;
      border-top: 1px solid #e9ecef;
      transition: all 0.3s ease;
    }
    
    .footer-text {
      color: #6c757d;
      font-size: 14px;
      margin-bottom: 10px;
    }
    
    .social-links {
      margin: 15px 0;
    }
    
    .social-link {
      display: inline-block;
      margin: 0 10px;
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }
    
    .copyright {
      font-size: 12px;
      color: #adb5bd;
      margin-top: 15px;
    }
    
    .dark-mode-notice {
      text-align: center;
      font-size: 12px;
      color: #888;
      margin-top: 10px;
      font-style: italic;
    }
    
    @media (max-width: 600px) {
      .email-body {
        padding: 30px 20px;
      }
      
      .verification-button {
        width: 100%;
        margin: 20px 0;
      }
    }
    
    @media (prefers-color-scheme: dark) {
      ${darkModeStyles}
    }
    
    ${darkModeStyles}
  `;
};
