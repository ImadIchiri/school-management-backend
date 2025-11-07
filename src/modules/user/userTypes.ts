export type NewUser = {
  nom: string;
  prenom: string;
  dateNaissance: string;
  adresse: string;
  telephone: string;
  email: string;
  password: string;
  roleId?: number | null;
};

export type NewUserWithId = NewUser & {
  id: number;
};

export type ExistingUser = NewUser & {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  isDeleted?: boolean;

  roleId?: number;
  role?: any;

  candidat?: any;
  etudiant?: any;
  employe?: any;
  parent?: any;
};
