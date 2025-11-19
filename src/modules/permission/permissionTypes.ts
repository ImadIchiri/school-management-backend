export type CreatePermisionType = {
  name: string;
  description: string;
};

export type UpdatePermissionType = CreatePermisionType & {
  id: number;
};
