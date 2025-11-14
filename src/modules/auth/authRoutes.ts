import { Router } from "express";
import * as authController from "./authController";
import { createUser } from "../user/userController";

const authRoutes = Router();

authRoutes.post("/register", createUser);
authRoutes.post("/login", authController.loginUser);
authRoutes.post("/refreshToken", authController.refreshToken);
authRoutes.post("/revokeTokens", authController.revokeTokens);

export default authRoutes;
