import {Router} from "express";
import * as moduleController  from "./moduleController.js";

const moduleRoutes=Router();

moduleRoutes.get("/",moduleController.getAllModules);
moduleRoutes.get("/:id",moduleController.getModuleById);
moduleRoutes.post("/",moduleController.createModule);
moduleRoutes.put("/:id",moduleController.updateModule);
moduleRoutes.delete("/:id",moduleController.deleteModuleById);
export default moduleRoutes;