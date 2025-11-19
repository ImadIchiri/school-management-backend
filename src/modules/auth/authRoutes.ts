import { Router } from "express";
import * as authController from "./authController";
import { createUser } from "../user/userController";

const authRoutes = Router();

/*
    Article Used in those routes:
    https://mihai-andrei.com/blog/jwt-authentication-using-prisma-and-express/
*/
authRoutes.post("/register", createUser);
authRoutes.post("/login", authController.loginUser);
authRoutes.post("/refreshToken", authController.refreshToken);
authRoutes.post("/revokeTokens", authController.revokeTokens);
/*
    Article Used in those routes:
    https://medium.com/@kanishksinghmaurya/reset-password-forget-password-implementation-using-node-js-mongodb-nodemailer-jwt-7b2fe9597ca1
*/
authRoutes.post("/requestPasswordReset", authController.requestPasswordReset);
// URL Format ==> /resetPassword?id=${user.id}&token=${token}
authRoutes.post("/resetPassword", authController.resetPassword);

export default authRoutes;
