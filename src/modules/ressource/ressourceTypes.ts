export type RessourceCreate = {
  titre: string;
  description?: string;
  url: string;
  uploadedById: number;
  typeId: number;
};

export type RessourceUpdate = {
  titre: string;
  description?: string;
  url: string;
  uploadedById: number;
  typeId: number;
};
