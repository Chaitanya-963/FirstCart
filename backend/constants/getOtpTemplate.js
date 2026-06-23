const getOtpTemplate = (name, otp) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f4f7; color: #333333; margin: 0; padding: 0; }
        .email-container { max-width: 570px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px; margin-top: 40px; border: 1px solid #e8e8e8; }
        .logo { font-size: 24px; font-weight: bold; color: #2563eb; text-align: center; margin-bottom: 25px; }
        .greeting { font-size: 18px; font-weight: 600; color: #1f2937; margin-bottom: 10px; }
        .text { font-size: 15px; line-height: 1.6; color: #4b5563; margin-bottom: 25px; }
        .otp-container { text-align: center; margin: 30px 0; background-color: #f0fdf4; border: 2px dashed #4ade80; padding: 15px; border-radius: 6px; }
        .otp-code { font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #16a34a; }
        .expiry-text { font-size: 13px; color: #9ca3af; text-align: center; margin-top: 5px; }
        .footer { margin-top: 35px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="logo">FirstCart</div>
        <div class="greeting">Hello ${name},</div>
        <div class="text">
          Thank you for signing up with FirstCart! To complete your registration and secure your account, please verify your email address using the One-Time Password (OTP) below.
        </div>
        <div class="otp-container">
          <div class="otp-code">${otp}</div>
          <div class="expiry-text">This code is valid for 15 minutes.</div>
        </div>
        <div class="text">
          If you did not initiate this request, please ignore this email or contact our support team immediately.
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} FirstCart Inc. All rights reserved.<br>
          This is an automated operational email. Please do not reply directly.
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = getOtpTemplate;