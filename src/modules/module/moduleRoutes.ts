import {Router} from "express";
import * as moduleController  from "./moduleController";

const moduleRoutes=Router();

moduleRoutes.get("/modules",moduleController.getAllModules);
moduleRoutes.get("/modules/:id",moduleController.getModuleById);
moduleRoutes.post("/modules",moduleController.createModule);
moduleRoutes.put("/modules/:id",moduleController.updateModule);
moduleRoutes.delete("/modules/:id",moduleController.deleteModuleById);
export default moduleRoutes;