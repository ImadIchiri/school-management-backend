import * as etudiantController from "../../src/modules/etudiant/etudiantController";
import * as etudiantService from "../../src/modules/etudiant/etudiantService";

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Mock complet pour un étudiant
const mockEtudiant = {
  idEtudiant: 1,
  matricule: "M001",
  dateInscription: new Date("2025-11-19"),
  createdAt: new Date("2025-11-19"),
  updatedAt: new Date("2025-11-19"),
  deletedAt: null,
  isDeleted: false,
  user: {
    id: 1,
    nom: "Ayad",
    prenom: "Anwar",
    dateNaissance: new Date("2000-01-01"),
    adresse: "123 rue Exemple",
    telephone: "0600000000",
    email: "ayad@test.com",
    password: "password123",
    roleId: null,
    createdAt: new Date("2025-11-19"),
    updatedAt: new Date("2025-11-19"),
    deletedAt: null,
    isDeleted: false,
  },
  filiere: {
    id: 1,
    nom: "Informatique",
    description: "Filière info",
    createdAt: new Date("2025-11-19"),
    updatedAt: new Date("2025-11-19"),
    deletedAt: null,
    isDeleted: false,
  },
  groupe: {
    id: 1,
    nom: "Groupe A",
    niveauId: 1,
    createdAt: new Date("2025-11-19"),
    updatedAt: new Date("2025-11-19"),
    deletedAt: null,
    isDeleted: false,
    niveau: {
      id: 1,
      anneeLabel: "2025-2026",
      dateDebut: new Date("2025-10-15"),
      dateFin: new Date("2026-07-15"),
      filiereId: 1,
      createdAt: new Date("2025-11-19"),
      updatedAt: new Date("2025-11-19"),
      deletedAt: null,
      isDeleted: false,
    },
  },
};

describe("Etudiant Controller", () => {
  test("getAllEtudiantsController doit retourner la liste des étudiants", async () => {
    const req: any = {};
    const res = mockResponse();

    jest
      .spyOn(etudiantService, "getAllEtudiants")
      .mockResolvedValue([mockEtudiant] as any);

    await etudiantController.getAllEtudiantsController(req, res);

    expect(res.json).toHaveBeenCalledWith([mockEtudiant]);
  });

  test("getEtudiantController retourne 404 si étudiant non trouvé", async () => {
    const req: any = { params: { id: "99" } };
    const res = mockResponse();

    jest
      .spyOn(etudiantService, "getEtudiantById")
      .mockResolvedValue(null as any);

    await etudiantController.getEtudiantController(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "Étudiant non trouvé." });
  });

  test("getEtudiantController retourne l'étudiant si trouvé", async () => {
    const req: any = { params: { id: "1" } };
    const res = mockResponse();

    jest
      .spyOn(etudiantService, "getEtudiantById")
      .mockResolvedValue(mockEtudiant as any);

    await etudiantController.getEtudiantController(req, res);

    expect(res.json).toHaveBeenCalledWith(mockEtudiant);
  });

  test("createEtudiantController crée un étudiant et retourne 201", async () => {
    const req: any = {
      body: {
        matricule: "M001",
        userId: 1,
        groupeId: 1,
        filiereId: 1,
        dateInscription: new Date("2025-11-19"),
      },
    };
    const res = mockResponse();

    jest
      .spyOn(etudiantService, "createEtudiant")
      .mockResolvedValue(mockEtudiant as any);

    await etudiantController.createEtudiantController(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockEtudiant);
  });

  test("updateEtudiantController met à jour un étudiant", async () => {
    const req: any = { params: { id: "1" }, body: { matricule: "M002" } };
    const res = mockResponse();

    const updatedEtudiant = { ...mockEtudiant, matricule: "M002" };

    jest
      .spyOn(etudiantService, "updateEtudiant")
      .mockResolvedValue(updatedEtudiant as any);

    await etudiantController.updateEtudiantController(req, res);

    expect(res.json).toHaveBeenCalledWith(updatedEtudiant);
  });

  test("deleteEtudiantController supprime (soft delete) un étudiant", async () => {
    const req: any = { params: { id: "1" } };
    const res = mockResponse();

    const deletedEtudiant = { ...mockEtudiant, isDeleted: true };

    jest
      .spyOn(etudiantService, "deleteEtudiant")
      .mockResolvedValue(deletedEtudiant as any);

    await etudiantController.deleteEtudiantController(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "Étudiant supprimé.",
      etudiant: deletedEtudiant,
    });
  });
});
