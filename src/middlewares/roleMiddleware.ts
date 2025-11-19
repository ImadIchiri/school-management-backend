import { NextFunction, Request, Response } from "express";

/*
    This was done with the help of: 
        - https://stackoverflow.com/questions/44383387/typescript-error-property-user-does-not-exist-on-type-request
*/
type RequestWithUser = Request & {
  user: {
    id: number;
    role: {
      id: number;
      name: string;
    };
  };
};

export const roleMiddleware =
  (roles: string[]) =>
  (req: RequestWithUser, res: Response, next: NextFunction) => {
    const roleName = req.user.role.name;
    if (!roles.includes(roleName)) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }
    next();
  };
