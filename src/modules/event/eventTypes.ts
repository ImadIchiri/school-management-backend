export type NewEvent = {
  titre: string;
  date: string;
  employeId: number;
};

export type ExistingEvent = NewEvent & {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  isDeleted?: boolean;

  employeId?: number;
  employe?: any;

  etudiants?: any;
};
