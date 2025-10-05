import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

// 📧 Send verification email
export const sendVerificationEmail = async (email, token, username) => {
  const transporter = createTransporter();

  // FIX: URL encode the token to handle special characters
  const encodedToken = encodeURIComponent(token);
  const verifyUrl = `${process.env.CLIENT_URL}/verify-email/${encodedToken}`;

  const mailOptions = {
    from: `"E-shop Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify Your Email - E-shop",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
      </head>
      <body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f6f9fc;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Welcome to E-shop</h1>
            <p style="margin: 10px 0 0; opacity: 0.9; font-size: 16px;">Complete your registration</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #2d3748; margin-top: 0;">Hello ${username},</h2>
            
            <p style="font-size: 16px; color: #4a5568; margin-bottom: 25px;">
              Thank you for creating an account with E-shop. To complete your registration and start shopping, please verify your email address by clicking the button below:
            </p>
            
            <!-- Verification Button -->
            <div style="text-align: center; margin: 35px 0;">
              <a href="${verifyUrl}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 35px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);">
                Verify Email Address
              </a>
            </div>
            
            <p style="font-size: 14px; color: #718096; text-align: center; margin-bottom: 25px;">
              Or copy and paste this URL into your browser:
            </p>
            
            <!-- Alternative Link -->
            <div style="text-align: center;">
              <a href="${verifyUrl}" 
                 style="font-size: 14px; color: #667eea; word-break: break-all; text-decoration: none;">
                ${verifyUrl}
              </a>
            </div>
            
            <!-- Security Note -->
            <div style="margin-top: 35px; padding-top: 25px; border-top: 1px solid #e2e8f0;">
              <p style="font-size: 12px; color: #718096; margin: 0; text-align: center;">
                This verification link will expire in 24 hours for security reasons.
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f7fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="font-size: 12px; color: #718096; margin: 0 0 10px;">
              Need help? Contact our support team at <a href="mailto:support@eshop.com" style="color: #667eea; text-decoration: none;">support@eshop.com</a>
            </p>
            <p style="font-size: 11px; color: #a0aec0; margin: 0;">
              © ${new Date().getFullYear()} E-shop. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

// 📧 Send password reset email
export const sendPasswordResetEmail = async (email, token, username) => {
  const transporter = createTransporter();

  // FIX: URL encode the token for password reset as well
  const encodedToken = encodeURIComponent(token);
  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${encodedToken}`;

  const mailOptions = {
    from: `"E-shop Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Reset Your Password - E-shop",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
      </head>
      <body style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f6f9fc;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; font-weight: 600;">Password Reset</h1>
            <p style="margin: 10px 0 0; opacity: 0.9; font-size: 16px;">Secure your account</p>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <h2 style="color: #2d3748; margin-top: 0;">Hello ${username},</h2>
            
            <p style="font-size: 16px; color: #4a5568; margin-bottom: 25px;">
              We received a request to reset your E-shop account password. Click the button below to create a new secure password:
            </p>
            
            <!-- Reset Button -->
            <div style="text-align: center; margin: 35px 0;">
              <a href="${resetUrl}" 
                 style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 14px 35px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 15px rgba(245, 87, 108, 0.3);">
                Reset Password
              </a>
            </div>
            
            <p style="font-size: 14px; color: #718096; text-align: center; margin-bottom: 25px;">
              Or copy and paste this URL into your browser:
            </p>
            
            <!-- Alternative Link -->
            <div style="text-align: center;">
              <a href="${resetUrl}" 
                 style="font-size: 14px; color: #f5576c; word-break: break-all; text-decoration: none;">
                ${resetUrl}
              </a>
            </div>
            
            <!-- Security Notes -->
            <div style="margin-top: 35px; padding: 20px; background: #fff5f5; border-radius: 6px; border-left: 4px solid #fc8181;">
              <h4 style="color: #c53030; margin-top: 0; font-size: 14px;">Important Security Information:</h4>
              <ul style="font-size: 13px; color: #744210; margin: 10px 0; padding-left: 20px;">
                <li>This link will expire in 10 minutes</li>
                <li>If you didn't request this reset, please ignore this email</li>
                <li>Your password will remain unchanged until you create a new one</li>
              </ul>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #f7fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="font-size: 12px; color: #718096; margin: 0 0 10px;">
              For security questions, contact <a href="mailto:security@eshop.com" style="color: #f5576c; text-decoration: none;">security@eshop.com</a>
            </p>
            <p style="font-size: 11px; color: #a0aec0; margin: 0;">
              © ${new Date().getFullYear()} E-shop. All rights reserved.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent successfully');
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};