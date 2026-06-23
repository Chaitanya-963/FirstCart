const getResendOtpTemplate = (name, otp) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Your New OTP</title>
      <style>
        body { font-family: 'Segoe UI', sans-serif; background-color: #f4f4f7; color: #333; margin: 0; padding: 0; }
        .container { max-width: 570px; margin: 40px auto; background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e8e8e8; }
        .logo { font-size: 24px; font-weight: bold; color: #2563eb; text-align: center; margin-bottom: 25px; }
        .otp-box { text-align: center; margin: 30px 0; background-color: #eff6ff; border: 2px dashed #3b82f6; padding: 15px; border-radius: 6px; }
        .otp-code { font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #2563eb; }
        .footer { margin-top: 35px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">FirstCart</div>
        <h3>Hello ${name},</h3>
        <p>As requested, here is your new One-Time Password (OTP) to complete your email verification process.</p>
        <div class="otp-box">
          <div class="otp-code">${otp}</div>
          <p style="font-size: 13px; color: #6b7280; margin-top: 5px;">Valid for 15 minutes.</p>
        </div>
        <p>If you did not make this request, you can safely ignore this email.</p>
        <div class="footer">&copy; ${new Date().getFullYear()} FirstCart Inc.</div>
      </div>
    </body>
    </html>
  `;
};

module.exports = getResendOtpTemplate;