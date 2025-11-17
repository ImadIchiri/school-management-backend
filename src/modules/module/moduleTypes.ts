// export type coursType = {
//   id: number;
//   titre: string;
//   dateDebut: Date;
//   dateFin: Date;
//   moduleId: number;
//   description?: string | null; 
//   duree?: number | null;       
//   enseignantId?: number | null;
//   salleId?: number | null;
//   createdAt: Date;
//   updatedAt: Date;
//   isDeleted: boolean;
//   module?: moduleType | null;  
// };

export type moduleType = {
  id: number;
  nom: string;
  description: string;
  niveauId: number;

  cours?: {
    id: number;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
    titre: string;
    dateDebut: Date;
    dateFin: Date;
    duree: number | null;
    moduleId: number;
    enseignantId: number | null;
    salleId: number | null;
  }[];
}
