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
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Error",
      error: error,
    });
  }
};

// Define specific type for params
type GetEventByIdParams = {
  eventId: string | undefined;
};
/* 
    Get Event By Id
    Request Param: { eventId }
*/
export const getEventById = async (
  req: Request<GetEventByIdParams>,
  res: Response
) => {
  try {
    const { eventId } = req.params;

    if (eventId === undefined) {
      return res.status(400).json({
        success: false,
        message: `Invalid Id: ${eventId}`,
      });
    }

    const event: ExistingEvent | null = await eventService.getEventById(
      parseInt(eventId)
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: `No event found for the Id: ${eventId}`,
      });
    }

    return res.status(200).json({
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

    Date Format:
      date: (year, month (0-indexed), day, hour, minute, second, and millisecond)
      expl: 28/05/2026 == date: (2026, 4, 28, 12, 30, 0, 0)
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

    // remove 'emmploye: {...}' from event Object - And keep 'employeId'
    if (event?.employe) delete event.employe;

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
    const { eventId: evenIdParams } = req.params;
    const { eventId: eventIdBody, titre, date, employeId } = req.body;

    // Check if Ids are the same
    if (
      evenIdParams === undefined ||
      eventIdBody === undefined ||
      parseInt(evenIdParams) !== eventIdBody
    ) {
      return res.status(400).json({
        success: false,
        message: "Make sure Ids are valid numbers and are the same!",
      });
    }

    // Check For Employe
    const employe = await prisma.employe.findUnique({
      where: { idEmploye: employeId, isDeleted: false },
    });

    if (!employe) {
      return res.status(400).json({
        success: false,
        message: `No Employe Found With Id: ${employeId}`,
      });
    }

    // Check If Event Exists
    const event: ExistingEvent | null = await eventService.getEventById(
      eventIdBody
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: `No Event Foud With Id ${employeId}`,
      });
    }

    // Update Event
    const updatedEvent = await eventService.updateEvent({
      ...event,
      titre,
      date,
      employeId,
    });

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
    const { eventId: evenIdParams } = req.params;
    const { eventId: eventIdBody }: { eventId: number | undefined } = req.body;

    // Check if Ids are the same
    if (
      evenIdParams === undefined ||
      eventIdBody === undefined ||
      parseInt(evenIdParams) !== eventIdBody
    ) {
      return res.status(400).json({
        success: false,
        message: "Make sure Ids are valid numbers and are the same!",
      });
    }

    // Check If Event Exists
    const event = await eventService.getEventById(eventIdBody);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: `No Event Foud With Id ${eventIdBody}`,
      });
    }

    // Delete the Event
    const deletedEvent = await eventService.deleteEvent(eventIdBody);

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
