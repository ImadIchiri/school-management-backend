import { Router } from "express";
import * as userController from "./userController";

const userRoutes = Router();

userRoutes.get("/users", userController.getAllUsers);
userRoutes.get("/users/:userId", userController.getUserById);
userRoutes.post("/users", userController.createUser);
userRoutes.put("/users/:userId", userController.updateUser);
userRoutes.put("/users/:userId", userController.deleteUser);

export default userRoutes;
