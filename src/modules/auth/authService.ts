import "dotenv/config";
import prisma from "../../config/prisma";
import { hashToken } from "../../utils/hashToken";
import nodemailer from "nodemailer";

// used when we create a refresh token.
// a refresh token is valid for 30 days
// that means that if a user is inactive for more than 30 days, he will be required to log in again
export const addRefreshTokenToWhitelist = ({
  refreshToken,
  userId,
}: {
  refreshToken: string;
  userId: number;
}) => {
  return prisma.refreshToken.create({
    data: {
      hashedToken: hashToken(refreshToken),
      userId,
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
    },
  });
};

// used to check if the token sent by the client is in the database.
export const findRefreshToken = (token: string) => {
  return prisma.refreshToken.findUnique({
    where: {
      hashedToken: hashToken(token),
    },
  });
};

// soft delete tokens after usage.
export const deleteRefreshTokenById = (id: string) => {
  return prisma.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
};

export const revokeTokens = (userId: number) => {
  return prisma.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  });
};

const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODEMAILER_AUTH_USER_EMAIL,
    pass: process.env.NODEMAILER_AUTH_PASSWORD, // crated in 'Application Passwords section on Google_Account'
  },
});

export const sendVerificationEmail = async (
  sender: string,
  recipient: string,
  refreshToken: string,
  credentials: { email: string; password: string }
) => {
  // Define Mail Options
  const mailOptions = {
    from: sender,
    to: recipient,
    // subject: "Verify Your Email - YNOV SchoolManagemnt",
    subject: "Your Credentials - YNOV SchoolManagemnt",
    html: `
    <div style="
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      text-align: center;
      font-size: 18px;
      color: #333;
    ">
    
    <h3 style="margin-bottom: 20px;">Your Login Credentials</h3>

    <div style="
      margin: 10px auto;
      padding: 12px 20px;
      border-radius: 6px;
      background: #059023;
      color: #fff;
      font-weight: bold;
      width: max-content;
    ">
      Email: ${credentials.email.replace("@", "&#8203;@")}
    </div>

    <div style="
      margin: 10px auto;
      padding: 12px 20px;
      border-radius: 6px;
      background: #059023;
      color: #fff;
      font-weight: bold;
      width: max-content;
    ">
      Password: ${credentials.password}
    </div>

    <p style="margin-top: 25px; font-size: 15px; color: #666;">
      Please keep this information secure.
    </p>
</div>`,
  };

  // Send Mail with the transporter
  await emailTransporter.sendMail(mailOptions);
};

export const emailVerificationUrl = (refreshToken: string): string =>
  `http://localhost:${
    process.env.PORT || 8080
  }/api/v1/verify-email?token=${refreshToken}`;
