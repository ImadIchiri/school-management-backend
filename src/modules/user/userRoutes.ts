import { Router } from "express";
import * as userController from "./userController";

const userRoutes = Router();

userRoutes.get("/users", userController.getAllUsers);
userRoutes.get("/users/:userId", userController.getUserById);
userRoutes.post("/users", userController.createUser);
userRoutes.put("/users", userController.updateUser);
userRoutes.delete("/users", userController.deleteUser);

export default userRoutes;
