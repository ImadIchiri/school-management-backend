import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { getUserByEmail, getUserById } from "../user/userService";
import { generateTokens } from "../../utils/jwt";
import * as authService from "./authService";

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

    const existingUser = await getUserByEmail(email);

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

    const { accessToken, refreshToken } = generateTokens({
      id: existingUser.id,
      role: { id: existingUser.role.id, name: existingUser.role.name },
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
    return res.status(500).json({
      success: false,
      message: err.message || "Internal server error while Login",
    });
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

    const user = await getUserById(savedRefreshToken.userId);
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
