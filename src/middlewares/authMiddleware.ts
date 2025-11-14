import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401);
    throw new Error("🚫 Un-Authorized 🚫");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(
      token as string,
      process.env.JWT_ACCESS_SECRET as string
    );
    // This One (req.payload = payload) Shows Error So I will Use The Code Bellow
    Object(req).payload = payload;
  } catch (err: any) {
    res.status(401);
    if (err.name === "TokenExpiredError") {
      throw new Error(err.name);
    }
    throw new Error("🚫 Un-Authorized 🚫");
  }

  return next();
};
