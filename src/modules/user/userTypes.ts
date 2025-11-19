export type NewUser = {
  nom: string;
  prenom: string;
  dateNaissance: Date;
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
  deletedAt?: Date | null;
  isDeleted?: boolean;

  roleId?: number | null;
  role?: any;

  candidat?: any;
  etudiant?: any;
  employe?: any;
  parent?: any;
};

export type UserForToken = {
  id: number;
  role: {
    id: number;
    name: String;
  };
};
