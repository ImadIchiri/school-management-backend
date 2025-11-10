import prisma from "../../config/prisma";
import type { CreateExamenDTO, UpdateExamenDTO } from "./examenTypes";

const toDate = (d: Date | string) => (typeof d === "string" ? new Date(d) : d);

const ensureModuleExists = async (moduleId: number) => {
  const m = await prisma.module.findFirst({ where: { id: moduleId } });
  if (!m) throw new Error("Module introuvable");
  return m;
};

const ensureEnseignantExists = async (enseignantId: number) => {
  const e = await prisma.enseignant.findFirst({ where: { idEnseignant: enseignantId } });
  if (!e) throw new Error("Enseignant introuvable");
  return e;
};

const ensureSalleExists = async (salleId: number) => {
  const s = await prisma.salle.findFirst({ where: { id: salleId } });
  if (!s) throw new Error("Salle introuvable");
  return s;
};

const createExamen = async (payload: CreateExamenDTO) => {
  const { moduleId, enseignantId, salleId, etudiants, dateDebut, dateFin, titre, type, coeff, dureeMinutes } = payload;

  await ensureModuleExists(moduleId);
  await ensureEnseignantExists(enseignantId);
  if (salleId) await ensureSalleExists(salleId);

  const exam = await prisma.examen.create({
    data: {
      titre,
      type,
      coeff: coeff ?? 1,
      dateDebut: toDate(dateDebut),
      dateFin: toDate(dateFin),
      dureeMinutes: dureeMinutes ?? null,
      moduleId,
      enseignantId,
      salleId: salleId ?? null,
    },
  });

  // create EtudiantExamen records if provided
  if (etudiants && etudiants.length > 0) {
    const toCreate = etudiants.map((s) => ({
      etudiantId: s.etudiantId,
      present: s.present ?? false,
      note: s.note ?? 0,
      mention: s.mention ?? "",
      dateEvaluation: s.dateEvaluation ? toDate(s.dateEvaluation) : new Date(),
      examenId: exam.id,
    }));

    // use createMany for performance; cast to any to avoid strict type issues
    await prisma.etudiantExamen.createMany({ data: toCreate as any });
  }

  return prisma.examen.findUnique({ where: { id: exam.id }, include: { etudiants: { include: { etudiant: { include: { user: true } } } }, enseignant: true, module: true, salle: true } });
};

const getAllExamens = async (filters?: { moduleId?: number; enseignantId?: number; from?: Date | string; to?: Date | string }) => {
  const where: any = {};
  if (filters?.moduleId) where.moduleId = filters.moduleId;
  if (filters?.enseignantId) where.enseignantId = filters.enseignantId;
  if (filters?.from || filters?.to) {
    where.dateDebut = {};
    if (filters.from) where.dateDebut.gte = toDate(filters.from);
    if (filters.to) where.dateDebut.lte = toDate(filters.to);
  }

  return prisma.examen.findMany({ where, orderBy: { dateDebut: "desc" }, include: { etudiants: { include: { etudiant: { include: { user: true } } } }, enseignant: true, module: true, salle: true } });
};

const getExamenById = async (id: number) => {
  const exam = await prisma.examen.findUnique({ where: { id }, include: { etudiants: { include: { etudiant: { include: { user: true } } } }, enseignant: true, module: true, salle: true } });
  if (!exam) throw new Error("Examen introuvable");
  return exam;
};

const updateExamen = async (id: number, payload: UpdateExamenDTO) => {
  const existing = await prisma.examen.findUnique({ where: { id } });
  if (!existing) throw new Error("Examen introuvable");

  const data: any = {};
  if (payload.titre) data.titre = payload.titre;
  if (payload.type) data.type = payload.type;
  if (payload.coeff !== undefined) data.coeff = payload.coeff;
  if (payload.dateDebut) data.dateDebut = toDate(payload.dateDebut);
  if (payload.dateFin) data.dateFin = toDate(payload.dateFin);
  if (payload.dureeMinutes !== undefined) data.dureeMinutes = payload.dureeMinutes;
  if (payload.moduleId) {
    await ensureModuleExists(payload.moduleId);
    data.moduleId = payload.moduleId;
  }
  if (payload.enseignantId) {
    await ensureEnseignantExists(payload.enseignantId);
    data.enseignantId = payload.enseignantId;
  }
  if (payload.salleId !== undefined) {
    if (payload.salleId !== null) await ensureSalleExists(payload.salleId);
    data.salleId = payload.salleId;
  }

  const updated = await prisma.examen.update({ where: { id }, data });
  return prisma.examen.findUnique({ where: { id: updated.id }, include: { etudiants: { include: { etudiant: { include: { user: true } } } }, enseignant: true, module: true, salle: true } });
};

const deleteExamen = async (id: number) => {
  const existing = await prisma.examen.findUnique({ where: { id } });
  if (!existing) throw new Error("Examen introuvable");

  // soft-delete using isDeleted and deletedAt when available
  const updateData: any = { isDeleted: true, deletedAt: new Date() };
  const deleted = await prisma.examen.update({ where: { id }, data: updateData as any });
  return deleted;
};

// Ensure etudiant exists (schema uses idEtudiant)
const ensureEtudiantExists = async (etudiantId: number) => {
  const e = await prisma.etudiant.findFirst({ where: { idEtudiant: etudiantId } });
  if (!e) throw new Error("Etudiant introuvable");
  return e;
};

/** Relation helpers **/
const listEtudiantsForExamen = async (examenId: number) => {
  await prisma.examen.findUnique({ where: { id: examenId } }); // will be null if not exists -> let client handle
  return prisma.etudiantExamen.findMany({ where: { examenId }, include: { etudiant: { include: { user: true } } } });
};

const addEtudiantsToExamen = async (examenId: number, etudiants: Array<any>) => {
  const exam = await prisma.examen.findUnique({ where: { id: examenId } });
  if (!exam) throw new Error("Examen introuvable");

  const toCreate = [] as any[];
  for (const s of etudiants) {
    if (!s?.etudiantId) throw new Error("etudiantId requis pour chaque entrée");
    await ensureEtudiantExists(s.etudiantId);
    toCreate.push({
      etudiantId: s.etudiantId,
      present: s.present ?? false,
      note: s.note ?? 0,
      mention: s.mention ?? "",
      dateEvaluation: s.dateEvaluation ? (typeof s.dateEvaluation === "string" ? new Date(s.dateEvaluation) : s.dateEvaluation) : new Date(),
      examenId,
    });
  }

  // createMany with skipDuplicates to avoid duplicates
  await prisma.etudiantExamen.createMany({ data: toCreate as any, skipDuplicates: true });
  return prisma.etudiantExamen.findMany({ where: { examenId }, include: { etudiant: { include: { user: true } } } });
};

const removeEtudiantFromExamen = async (examenId: number, etudiantId: number) => {
  // ensure both exist
  const exam = await prisma.examen.findUnique({ where: { id: examenId } });
  if (!exam) throw new Error("Examen introuvable");
  await ensureEtudiantExists(etudiantId);

  const deleted = await prisma.etudiantExamen.deleteMany({ where: { examenId, etudiantId } });
  return deleted;
};

export default { createExamen, getAllExamens, getExamenById, updateExamen, deleteExamen };
