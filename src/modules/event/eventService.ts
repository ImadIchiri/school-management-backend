import prisma from "../../config/prisma";
import type { ExistingEvent, NewEvent } from "./eventTypes";

// Get All Events
export const getAllEvents = () => {
  return prisma.event.findMany({
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

// Get Event By Id
export const getEventById = (
  eventId: number
): Promise<ExistingEvent | null> => {
  return prisma.event.findUnique({
    where: {
      id: eventId,
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

// Get All Events Created By An Employe
export const getEventsByEmploye = (
  employeId: number
): Promise<ExistingEvent[]> => {
  return prisma.event.findMany({
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

// Create New Event
export const createEvent = (event: NewEvent): Promise<ExistingEvent> => {
  return prisma.event.create({
    data: event,
    omit: {
      isDeleted: true,
      deletedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// Update An Event event: { id, titre, date, employeId }
export const updateEvent = (event: ExistingEvent): Promise<ExistingEvent> => {
  return prisma.event.update({
    where: { id: event.id },
    data: {
      id: event.id,
      titre: event.titre,
      date: event.date,
      employeId: event.employeId,
    },
    omit: {
      isDeleted: true,
      deletedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// Delete An Event
export const deleteEvent = (event: ExistingEvent): Promise<ExistingEvent> => {
  return prisma.event.update({
    where: { id: event.id },
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
