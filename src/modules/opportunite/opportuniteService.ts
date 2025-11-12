import prisma from "../../config/prisma";
import { ExistingOpportunity, NewOpportunity } from "./opportuniteTypes";

// Get All Opportunities
export const getAllOpportunities = () => {
  return prisma.opportunite.findMany({
    where: { isDeleted: false },
    include: {
      employe: {
        omit: {
          createdAt: true,
          deletedAt: true,
          isDeleted: true,
          salaire: true,
          updatedAt: true,
        },
      },
      etudiants: true,
    },
    omit: {
      isDeleted: true,
      deletedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// Get Opportunity By Id
export const getOpportunityById = (
  opportunityId: number
): Promise<ExistingOpportunity | null> => {
  return prisma.opportunite.findUnique({
    where: {
      id: opportunityId,
      isDeleted: false,
    },
    include: {
      employe: {
        omit: {
          createdAt: true,
          deletedAt: true,
          isDeleted: true,
          salaire: true,
          updatedAt: true,
        },
      },
    },
    omit: {
      isDeleted: true,
      deletedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// Get All Opportunities Created By An Employe
export const getOpportunitiesByEmploye = (
  employeId: number
): Promise<ExistingOpportunity[]> => {
  return prisma.opportunite.findMany({
    where: {
      employeId,
      isDeleted: false,
    },
    omit: {
      isDeleted: true,
      deletedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// Create New Opportunity
export const createOpportunity = (
  opportunity: NewOpportunity
): Promise<ExistingOpportunity> => {
  return prisma.opportunite.create({
    data: opportunity,
    omit: {
      isDeleted: true,
      deletedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// Update An Opportunity - opportunity: { id, titre, type, employeId }
export const updateOpportunity = (
  opportunity: ExistingOpportunity
): Promise<ExistingOpportunity> => {
  return prisma.opportunite.update({
    where: { id: opportunity.id },
    data: {
      titre: opportunity.titre,
      type: opportunity.type,
      employeId: opportunity.employeId,
    },
    omit: {
      isDeleted: true,
      deletedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// Delete An Opportunity
export const deleteOpportunity = (
  opportuniteyId: number
): Promise<ExistingOpportunity> => {
  return prisma.opportunite.update({
    where: { id: opportuniteyId },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
    omit: {
      isDeleted: true,
      deletedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};
