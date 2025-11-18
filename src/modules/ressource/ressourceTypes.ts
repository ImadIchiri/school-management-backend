export type RessourceCreate = {
  titre: string;
  description: string;
  url: string;
  uploadedById: number | null;
  typeId: number;
};

export type RessourceUpdate = {
  titre: string;
  description: string;
  url: string;
  uploadedById: number | null;
  typeId: number;
};