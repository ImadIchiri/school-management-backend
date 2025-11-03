import type { Request, Response } from "express";
import * as eventService from "./eventService";
import type { ExistingEvent } from "./eventTypes";
import prisma from "../../config/prisma";

/* 
    Get All Events
*/
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events: ExistingEvent[] = await eventService.getAllEvents();

    return res.status(200).json({
      success: true,
      data: events,
      length: events.length,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
    });
  }
};

/* 
    Get Event By Id
    Request Body: { eventId }
*/
export const getEventById = async (req: Request, res: Response) => {
  try {
    // eventId send on the body
    const { eventId: id }: { eventId: number } = req.body;
    const event: ExistingEvent = await eventService.getEventById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: `No event found for the Id: ${id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error Getting All Events",
    });
  }
};

/*
    Create New Event
    Request Body: { titre: string, date DateTime, employeId Int }
*/
export const createEvent = async (req: Request, res: Response) => {
  try {
    const { titre, date, employeId } = req.body;

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

    // Create New Event
    const event: ExistingEvent = await eventService.createEvent({
      titre,
      date,
      employeId,
    });

    return res.status(201).json({
      success: true,
      data: event,
      message: `Event created successfully`,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error While Creating Event",
    });
  }
};

/*
    Update Event
    Request Body: { eventId: Int, titre: string, date DateTime, employeId Int }
*/
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { eventId, titre, date, employeId } = req.body;

    // Check If Event Exists
    const event: ExistingEvent | undefined = await eventService.getEventById(
      eventId
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: `No Event Foud With Id ${employeId}`,
      });
    }

    const updatedEvent = await eventService.updateEvent({
      ...event,
      titre,
      date,
      employeId,
    });

    // Update Employe
    return res.status(200).json({
      success: true,
      message: `Event Updated Successfully`,
      date: updatedEvent,
    });
  } catch (error: any) {
    console.log(`Error While Updating Event ${error}`);
    return res.status(500).json({
      success: false,
      message: `Error While Updating Event`,
      error: error,
    });
  }
};

/*
    Delete Event
    Request Body: { eventId: Int }
*/
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { eventId }: { eventId: number } = req.body;

    // Check If Event Exists
    const event = await eventService.getEventById(eventId);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: `No Event Foud With Id ${eventId}`,
      });
    }

    // Check If Already Deleted

    // Delete the Event
    const deletedEvent = eventService.deleteEvent(event);

    return res.status(200).json({
      success: true,
      message: `Event deleted Successfylly`,
      data: deletedEvent,
    });
  } catch (error) {
    console.log(`Error while deleting Event ${error}`);
    return res.status(500).json({
      success: false,
      message: `Error While Deleting Event`,
      error: error,
    });
  }
};
