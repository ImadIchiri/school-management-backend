import prisma from "../../config/prisma";
import { ExistingOpportunity, NewOpportunity } from "./opportuniteTypes";

// Get All Opportunities
export const getAllOpportunities = () => {
  return prisma.opportunite.findMany({
    where: { isDeleted: false },
    include: { employe: true, etudiants: true },
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

// Update An Opportunity - opportunite: { id, titre, type, employeId }
export const updateOpportunity = (
  opportunite: ExistingOpportunity
): Promise<ExistingOpportunity> => {
  return prisma.opportunite.update({
    where: { id: opportunite.id },
    data: {
      id: opportunite.id,
      titre: opportunite.titre,
      employeId: opportunite.employeId,
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
  opportunity: ExistingOpportunity
): Promise<ExistingOpportunity> => {
  return prisma.opportunite.update({
    where: { id: opportunity.id },
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
