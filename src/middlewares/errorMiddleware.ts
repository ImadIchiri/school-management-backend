import type { Request, Response, NextFunction } from "express";

/**
 * Error handling middleware centralisé.
 * Usage: lancer des erreurs avec `err.statusCode` (number) et `err.message` (string)
 * Le middleware renvoie un payload JSON propre et un code HTTP adapté.
 */
export default function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  const status = typeof err?.statusCode === "number" ? err.statusCode : 500;
  const message = err?.message ?? "Internal Server Error";

  const payload: any = { message };
  // expose details only in non-production for debugging
  if (process.env.NODE_ENV !== "production") {
    payload.stack = err?.stack;
    if (err?.details) payload.details = err.details;
  }

  res.status(status).json(payload);
}
