import { Router } from "express";
import * as opportunityOpportunity from "./opportuniteController";

const opportunityRoutes = Router();

// Get All Opportunities
opportunityRoutes.get(
  "/opportunities",
  opportunityOpportunity.getAllOpportunities
);

// Get Opportunity By Id
opportunityRoutes.get(
  "/opportunities/:opportunityId",
  opportunityOpportunity.getOpportunityById
);

// Create New Opportunity
opportunityRoutes.post(
  "/opportunities",
  opportunityOpportunity.createOpportunity
);

// Update Opportunity
opportunityRoutes.put(
  "/opportunities/:opportunityId",
  opportunityOpportunity.updateOpportunity
);

// Delete Opportunity
opportunityRoutes.put(
  "/opportunities/:opportunityId",
  opportunityOpportunity.deleteOpportunity
);

export default opportunityRoutes;
