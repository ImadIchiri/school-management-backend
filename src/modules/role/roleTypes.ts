export type CreateRoleType = {
  name: string;
  description?: string;
};

export type UpdateRoleType = CreateRoleType & {
  id: number;
};
