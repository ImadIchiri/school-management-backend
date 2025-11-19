import crypto from "crypto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserForToken } from "../modules/user/userTypes";

// Token Expires After '5 minutes'
export const generateAccessToken = (user: UserForToken) => {
  return jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: "5m",
    }
  );
};

// Generate a random string as refreshToken
export const generateRefreshToken = (): string =>
  crypto.randomBytes(16).toString("base64url");

// Generate Tokens
type GenerateTokensType = {
  accessToken: string;
  refreshToken: string;
};

export const generateTokens = (user: UserForToken): GenerateTokensType => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken();
  return { accessToken, refreshToken };
};

export const hashPassword = (password: string): Promise<string> =>
  bcrypt.hash(password, 12);
