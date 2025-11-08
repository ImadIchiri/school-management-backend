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

// Define specific type for params
type GetOpportunityByIdParams = {
  opportunityId: string | undefined;
};
/* 
    Get Opportunity By Id
    Request Body: { opportunityId }
*/
export const getOpportunityById = async (
  req: Request<GetOpportunityByIdParams>,
  res: Response
) => {
  try {
    const { opportunityId } = req.params;

    if (opportunityId === undefined) {
      return res.status(400).json({
        success: false,
        message: `Invalid Id: ${opportunityId}`,
      });
    }

    const opportunity: ExistingOpportunity | null =
      await opportunityService.getOpportunityById(parseInt(opportunityId));

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: `No opportunity found for the Id: ${opportunityId}`,
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
        message: `No Employee Found With Id ${employeId}`,
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
    const { opportunityId: opportunityIdParam } = req.params;
    const {
      opportunityId: opportunityIdBody,
      titre,
      type,
      employeId,
    }: {
      opportunityId: number;
      titre: string;
      type: string;
      employeId: number;
    } = req.body;

    // Check if Ids are the same
    if (
      opportunityIdParam === undefined ||
      opportunityIdBody === undefined ||
      parseInt(opportunityIdParam) !== opportunityIdBody
    ) {
      return res.status(400).json({
        success: false,
        message: "Make sure Ids are valid numbers and are the same!",
      });
    }

    // Check If Opportunity Exists
    const opportunity: ExistingOpportunity | null =
      await opportunityService.getOpportunityById(opportunityIdBody);

    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: `No Opportunity Found With Id ${opportunityIdBody}`,
      });
    }

    // Check If Employe Exists
    const employe = await prisma.employe.findUnique({
      where: { idEmploye: employeId, isDeleted: false },
    });

    if (!employe) {
      return res.status(404).json({
        success: false,
        message: `No Employe Found With Id ${employeId}`,
      });
    }

    // Update Opportunity
    const updatedOpportunity = await opportunityService.updateOpportunity({
      id: opportunityIdBody,
      titre: titre || opportunity.titre,
      type: type || opportunity.type,
      employeId,
    });

    return res.status(200).json({
      success: true,
      message: `Opportunity Updated Successfully`,
      date: updatedOpportunity,
    });
  } catch (error: any) {
    console.log(`Error While Updating Opportunity ${error}`);
    return res.status(500).json({
      success: false,
      message: `Error While Updating Opportunity`,
      error: error,
    });
  }
};

/*
    Delete Opportunity
    Request Body: { opportunityId: Int }
*/
export const deleteOpportunity = async (req: Request, res: Response) => {
  try {
    const { opportunityId: opportunityIdParams } = req.params;
    const { opportunityId: opportunityIdBody }: { opportunityId: number } =
      req.body;

    // Check if Ids are the same
    if (
      opportunityIdParams === undefined ||
      opportunityIdBody === undefined ||
      parseInt(opportunityIdParams) !== opportunityIdBody
    ) {
      return res.status(400).json({
        success: false,
        message: "Make sure Ids are valid numbers and are the same!",
      });
    }

    // Check If Opportunity Exists
    const opportunity = await opportunityService.getOpportunityById(
      opportunityIdBody
    );
    if (!opportunity) {
      return res.status(404).json({
        success: false,
        message: `No Opportunity Found With Id ${opportunityIdBody}`,
      });
    }

    // Delete the Opportunity
    const deletedOpportunity = await opportunityService.deleteOpportunity(
      opportunityIdBody
    );

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
