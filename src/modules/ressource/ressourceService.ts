import prisma from "../../config/prisma";
import { CreateRessourceType } from "./ressourceTypes";

export const createRessource = async (ressource: CreateRessourceType) => {
  // return prisma.ressource.create({
  //   data: {
  //     titre: ressource.titre,
  //     description: ressource.description || "",
  //     url: ressource.url,
  //     uploadedBy: (ressource.uploadedById as number) || null,
  //     typeId: ressource.typeId,
  //   },
  // });
};
