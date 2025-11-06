import { Router } from "express";
import * as eventController from "./eventController";

const eventRoutes = Router();

// Get All Events
eventRoutes.get("/events", eventController.getAllEvents);

// Get Event By Id
eventRoutes.get("/events/:eventId", eventController.getEventById);

// Create New Event
eventRoutes.post("/events", eventController.createEvent);

// Update Event
eventRoutes.put("/events/:eventId", eventController.updateEvent);

// Delete Event
eventRoutes.put("/events/:eventId", eventController.deleteEvent);

export default eventRoutes;
