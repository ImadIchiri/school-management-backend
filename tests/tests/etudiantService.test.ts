import prisma from "../__mocks__/prisma";
import * as etudiantService from "../../src/modules/etudiant/etudiantService";

// Mock Prisma
jest.mock("../../src/config/prisma", () => ({
  prisma: {
    etudiant: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
  },
}));

const mockEtudiant = {
  idEtudiant: 1,
  matricule: "M001",
  userId: 1,
  dateInscription: new Date("2025-11-19"),
  createdAt: new Date("2025-11-19"),
  updatedAt: new Date("2025-11-19"),
  deletedAt: null,
  isDeleted: false,
  filiereId: 1,
  groupeId: 1,
};

describe("Etudiant Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("createEtudiant crée un étudiant", async () => {
    // ⚡ Cast correct pour TypeScript
    (
      prisma.etudiant.create as jest.MockedFunction<
        typeof prisma.etudiant.create
      >
    ).mockResolvedValue(mockEtudiant);

    const etudiant = await etudiantService.createEtudiant(mockEtudiant);
    expect(etudiant).toEqual(mockEtudiant);
  });

  test("getEtudiantById retourne un étudiant existant", async () => {
    (
      prisma.etudiant.findUnique as jest.MockedFunction<
        typeof prisma.etudiant.findUnique
      >
    ).mockResolvedValue(mockEtudiant);

    const etudiant = await etudiantService.getEtudiantById(1);
    expect(etudiant).toEqual(mockEtudiant);
  });

  test("updateEtudiant met à jour un étudiant", async () => {
    const updated = { ...mockEtudiant, matricule: "M002" };
    (
      prisma.etudiant.update as jest.MockedFunction<
        typeof prisma.etudiant.update
      >
    ).mockResolvedValue(updated);

    const etudiant = await etudiantService.updateEtudiant(1, {
      matricule: "M002",
    });
    expect(etudiant).toEqual(updated);
  });

  test("deleteEtudiant effectue un soft delete", async () => {
    const deleted = { ...mockEtudiant, isDeleted: true, deletedAt: new Date() };
    (
      prisma.etudiant.update as jest.MockedFunction<
        typeof prisma.etudiant.update
      >
    ).mockResolvedValue(deleted);

    const etudiant = await etudiantService.deleteEtudiant(1);
    expect(etudiant.isDeleted).toBe(true);
  });

  test("getAllEtudiants retourne la liste des étudiants", async () => {
    (
      prisma.etudiant.findMany as jest.MockedFunction<
        typeof prisma.etudiant.findMany
      >
    ).mockResolvedValue([mockEtudiant]);

    const etudiants = await etudiantService.getAllEtudiants();
    expect(etudiants).toEqual([mockEtudiant]);
  });
});
