import type { Request, Response } from "express";
import * as opportunityService from "./opportuniteService";
import prisma from "../../config/prisma";
import { ExistingOpportunity } from "./opportuniteTypes";

/* 
    Get All Opportunities
*/
export const getAllOpportunities = async (req: Request, res: Response) => {
  try {
    const opportunities: ExistingOpportunity[] =
      await opportunityService.getAllOpportunities();

    return res.status(200).json({
      success: true,
      data: opportunities,
      length: opportunities.length,
    });
  } catch (error: any) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Internal Server Error - While Getting All Opportunities",
      error: error,
    });
  }
};

/* 
    Get Opportunity By Id
    Request Body: { opportunityId }
*/
export const getOpportunityById = async (req: Request, res: Response) => {
  try {
    // opportunityId send on the body
    const { opportunityId: id }: { opportunityId: number } = req.body;
    const opportunity: ExistingOpportunity | null =
      await opportunityService.getOpportunityById(id);

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: `No opportunity found for the Id: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: opportunity,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        error?.message || "Internal Server Error Getting Opportunity By Id",
      error: error,
    });
  }
};

/*
    Create New Opportunity
    Request Body: { titre: string, type String, employeId Int }
*/
export const createOpportunity = async (req: Request, res: Response) => {
  try {
    const {
      titre,
      type,
      employeId,
    }: { titre: string; type: string; employeId: number } = req.body;

    // Check if Employe Exists
    const employe = await prisma.employe.findUnique({
      where: { idEmploye: employeId },
    });

    if (!employe) {
      return res.status(404).json({
        success: false,
        message: `No Employee Foud With Id ${employeId}`,
      });
    }

    // Create New Opportunity
    const opportunity: ExistingOpportunity =
      await opportunityService.createOpportunity({
        titre,
        type,
        employeId,
      });

    return res.status(201).json({
      success: true,
      data: opportunity,
      message: `Opportunity created successfully`,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message:
        error?.message || "Internal Server Error While Creating Opportunity",
      error: error,
    });
  }
};

/*
    Update Opportunity
    Request Body: { opportunityId: Int, titre: string, type string, employeId Int }
*/
export const updateOpportunity = async (req: Request, res: Response) => {
  try {
    const {
      opportunityId,
      titre,
      type,
      employeId,
    }: {
      opportunityId: number;
      titre: string;
      type: string;
      employeId: number;
    } = req.body;

    // Check If Opportunitey Exists
    const opportunitey: ExistingOpportunity | null =
      await opportunityService.getOpportunityById(opportunityId);

    if (!opportunitey) {
      return res.status(404).json({
        success: false,
        message: `No Opportunitey Foud With Id ${employeId}`,
      });
    }

    const updatedOpportunitey = await opportunityService.updateOpportunity({
      ...opportunitey,
      titre,
      type,
      employeId,
    });

    // Update Opportunitey
    return res.status(200).json({
      success: true,
      message: `Opportunitey Updated Successfully`,
      date: updatedOpportunitey,
    });
  } catch (error: any) {
    console.log(`Error While Updating Opportunitey ${error}`);
    return res.status(500).json({
      success: false,
      message: `Error While Updating Opportunitey`,
      error: error,
    });
  }
};

/*
    Delete Opportunitey
    Request Body: { opportuniteyId: Int }
*/
export const deleteOpportunity = async (req: Request, res: Response) => {
  try {
    const { opportuniteyId }: { opportuniteyId: number } = req.body;

    // Check If Opportunity Exists
    const opportunity = await opportunityService.getOpportunityById(
      opportuniteyId
    );
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: `No Opportunity Foud With Id ${opportuniteyId}`,
      });
    }

    // Delete the Opportunity
    const deletedOpportunity =
      opportunityService.deleteOpportunity(opportunity);

    return res.status(200).json({
      success: true,
      message: `Opportunity deleted Successfylly`,
      data: deletedOpportunity,
    });
  } catch (error) {
    console.log(`Error while deleting Opportunity ${error}`);
    return res.status(500).json({
      success: false,
      message: `Error While Deleting Opportunity`,
      error: error,
    });
  }
};
