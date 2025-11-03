import prisma from "../../config/prisma";
import type { ExistingEvent, NewEvent } from "./eventTypes";

// Get All Events
export const getAllEvents = async () => {
  return await prisma.event.findMany({
    where: { isDeleted: false },
    include: { employe: true, etudiants: true },
    omit: { isDeleted: true },
  });
};

// Get Event By Id
export const getEventById = async (eventId: number): Promise<ExistingEvent> => {
  return await prisma.event.findUnique({
    where: {
      id: eventId,
      isDeleted: false,
    },
    omit: { isDeleted: true },
  });
};

// Get All Events Created By An Employe
export const getEventsByEmploye = async (
  employeId: number
): Promise<ExistingEvent[]> => {
  return await prisma.event.findMany({
    where: {
      employeId,
      isDeleted: false,
    },
    omit: { isDeleted: true },
  });
};

// Create New Event
export const createEvent = async (event: NewEvent): Promise<ExistingEvent> => {
  return await prisma.event.create({ data: event });
};

// Update An Event event: { id, titre, date, employeId }
export const updateEvent = async (
  event: ExistingEvent
): Promise<ExistingEvent> => {
  return await prisma.event.update({
    where: { id: event.id },
    data: {
      id: event.id,
      titre: event.titre,
      date: event.date,
      employeId: event.employeId,
    },
  });
};

// Delete An Event
export const deleteEvent = async (
  event: ExistingEvent
): Promise<ExistingEvent> => {
  return await prisma.event.update({
    where: { id: event.id },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
  });
};
