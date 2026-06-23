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

const getOrderTemplate = (name, orderId, totalAmount, address) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmed</title>
      <style>
        body { font-family: 'Segoe UI', sans-serif; background-color: #f4f4f7; color: #333333; margin: 0; padding: 0; }
        .container { max-width: 570px; margin: 40px auto; background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e8e8e8; }
        .logo { font-size: 24px; font-weight: bold; color: #2563eb; text-align: center; margin-bottom: 25px; }
        .success-banner { background-color: #f0fdf4; border: 1px solid #bbf7d0; color: #16a34a; padding: 15px; border-radius: 6px; text-align: center; font-weight: bold; margin-bottom: 25px; }
        .details-box { background-color: #f9fafb; border: 1px solid #e5e7eb; padding: 15px; border-radius: 6px; margin-bottom: 20px; }
        .row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; }
        .label { color: #6b7280; }
        .value { font-weight: 600; color: #1f2937; text-align: right; }
        .footer { margin-top: 35px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">FirstCart</div>
        <div class="success-banner">🎉 Order Confirmed!</div>
        <p>Hello ${name},</p>
        <p>Thank you for shopping with us! Your order has been received and is being processed. Here are your transaction details:</p>
        
        <div class="details-box">
          <div class="row">
            <span class="label">Order ID:</span>
            <span class="value">${orderId}</span>
          </div>
          <div class="row">
            <span class="label">Total Amount:</span>
            <span class="value">₹${totalAmount}</span>
          </div>
          <div class="row">
            <span class="label">Shipping Address:</span>
            <!-- FIXED HERE: Accessing properties individually using template notation -->
            <span class="value">
              ${address.fullname}<br/>
              ${address.street}<br/>
              ${address.city}, ${address.state} - ${address.postalCode}
            </span>
          </div>
        </div>

        <p>We will send you another update with a tracking number once your package ships out.</p>
        <div class="footer">
          &copy; ${new Date().getFullYear()} FirstCart Inc. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `;
};


const getStatusUpdateTemplate = (name, orderId, status) => {
  // Select color styles matching status conditions
  const statusColors = {
    shipped: { text: "#2563eb", bg: "#eff6ff" },
    delivered: { text: "#16a34a", bg: "#f0fdf4" },
    cancelled: { text: "#dc2626", bg: "#fef2f2" },
    default: { text: "#d97706", bg: "#fffbeb" },
  };

  const currentStyle = statusColors[status] || statusColors.default;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Status Update</title>
      <style>
        body { font-family: 'Segoe UI', sans-serif; background-color: #f4f4f7; color: #333; margin: 0; padding: 0; }
        .container { max-width: 570px; margin: 40px auto; background-color: #ffffff; padding: 30px; border-radius: 8px; border: 1px solid #e8e8e8; }
        .logo { font-size: 24px; font-weight: bold; color: #2563eb; text-align: center; margin-bottom: 25px; }
        .status-pill { display: inline-block; padding: 8px 16px; font-weight: bold; border-radius: 20px; font-size: 14px; text-transform: uppercase; margin: 15px 0; background-color: ${currentStyle.bg}; color: ${currentStyle.text}; }
        .footer { margin-top: 35px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #e5e7eb; padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">FirstCart</div>
        <h3>Hello ${name},</h3>
        <p>The status of your FirstCart order <strong>#${orderId}</strong> has been updated:</p>
        <div style="text-align: center;">
          <span class="status-pill">${status}</span>
        </div>
        <p>Log in to your account dashboard at any time to trace package transit timelines or manage account options.</p>
        <div class="footer">&copy; ${new Date().getFullYear()} FirstCart Inc. All rights reserved.</div>
      </div>
    </body>
    </html>
  `;
};

module.exports = {
  getOtpTemplate,
  getResendOtpTemplate,
  getOrderTemplate,
  getStatusUpdateTemplate,
};
