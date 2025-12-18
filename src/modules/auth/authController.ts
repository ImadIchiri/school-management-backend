import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { Request, Response } from "express";
import * as authService from "./authService";
import * as userService from "../user/userService";
import { generateTokens, hashPassword } from "../../utils/jwt";
import prisma from "../../config/prisma";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const {
      email,
      password,
    }: { email: string | undefined; password: string | undefined } = req.body;
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "You must provide an email and a password.",
      });
    }

    const existingUser = await userService.getUserByEmail(email as string);

    if (!existingUser) {
      return res
        .status(403)
        .json({ success: true, message: "Invalid login credentials." });
    }

    const validPassword = await bcrypt.compare(
      password as string,
      existingUser.password
    );
    if (!validPassword) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid login credentials." });
    }

    // console.log({ existingUser });

    const { accessToken, refreshToken } = generateTokens({
      id: existingUser.id,
      role: { id: existingUser.role?.id, name: existingUser?.role?.name },
    });
    await authService.addRefreshTokenToWhitelist({
      refreshToken,
      userId: existingUser.id,
    });

    return res.status(200).json({
      accessToken,
      refreshToken,
      success: true,
    });
  } catch (err: any) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error while Login",
    });
  }
};

// A request will come to "http://localhost:8080/verify-email?token="
// I will check if the token is valid
// If Valid ==> edit the isValid attribute in the User table to be true
export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query; // verify-email?token=...

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No token found!",
      });
    }

    // Find the 'refreshToken' which has the 'userId'
    const refreshToken = await authService.findRefreshToken(token as string);

    if (!refreshToken)
      return res
        .status(404)
        .json({ success: false, message: "Invalid Or Outdated Refresh Token" });

    // Update the user based on 'userId'
    // const updatedUser = await prisma.user.update({
    //   where: { id: refreshToken.userId },
    //   data: { isValid: true },
    // });

    // if (!updatedUser)
    //   return res
    //     .status(404)
    //     .json({ success: false, message: "No User found with this token." });

    res
      .status(200)
      .json({ success: true, message: "Your account is activated now." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error while verifying email", error });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken }: { refreshToken: string | undefined } = req.body;
    if (!refreshToken) {
      return res
        .status(400)
        .json({ success: false, message: "Missing refresh token." });
    }

    const savedRefreshToken = await authService.findRefreshToken(refreshToken);
    if (
      !savedRefreshToken ||
      savedRefreshToken.revoked === true ||
      Date.now() >= savedRefreshToken.expireAt.getTime()
    ) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await userService.getUserById(savedRefreshToken.userId);
    if (!user) {
      return res.status(401).json({ succes: false, message: "Unauthorized" });
    }

    await authService.deleteRefreshTokenById(savedRefreshToken.id);
    const { accessToken, refreshToken: newRefreshToken } = generateTokens({
      id: user.id,
      role: { id: user.roleId as number, name: user.role.name },
    });
    await authService.addRefreshTokenToWhitelist({
      refreshToken: newRefreshToken,
      userId: user.id,
    });

    res.json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error while Refreshing Token",
    });
  }
};

export const revokeTokens = async (req: Request, res: Response) => {
  try {
    const { userId }: { userId: number | undefined } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId." });
    }

    await authService.revokeTokens(userId);
    res.json({ message: `Tokens revoked for user with id #${userId}` });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error while Refreshing Token",
    });
  }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email }: { email: string } = req.body;

  try {
    const user = await userService.getUserByEmail(email);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User doesn't exist" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_ACCESS_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    const resetURL = `http://localhost:${
      process.env.PORT || 8088
    }/api/v1/resetpassword?id=${user.id}&token=${token}`;

    const transporter = nodemailer.createTransport({
      service: process.env.NODEMAILER_SERVICE,
      auth: {
        user: process.env.NODEMAILER_AUTH_USER_EMAIL,
        pass: process.env.NODEMAILER_AUTH_PASSWORD,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.NODEMAILER_AUTH_USER_EMAIL,
      subject: "Password Reset Request",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      ${resetURL}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Password reset link sent" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  const { id, token } = req.query;
  const { password } = req.body;

  try {
    if (id === undefined || token === undefined) {
      return res
        .status(400)
        .json({ success: false, message: "User Id and token Are missing!" });
    }
    const user = await userService.getUserById(parseInt(id as string));
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not exists!" });
    }

    // payload format (from: requestPasswordReset): { id: user.id, email: user.email }
    const verify = jwt.verify(
      token as string,
      process.env.JWT_ACCESS_SECRET as string
    ) as { id: string; email: string };
    if (parseInt(id as string) !== parseInt(verify.id as string)) {
      return res.status(400).json({
        success: false,
        message: "Missing data in the coming token [Reset Password]!",
      });
    }

    // Encryptthe new Password
    const encryptedPassword = await hashPassword(password);

    // Update The Paswword
    await userService.updateUser({
      ...user,
      password: encryptedPassword,
    });

    res.status(200).json({ success: true, message: "Password has been reset" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while Reseting The Password!",
    });
  }
};
