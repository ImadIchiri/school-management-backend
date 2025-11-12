import "dotenv/config"; // <-- charge .env avant que Prisma lise env()
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: `tsx --env-file=.env prisma/seed.ts`,
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
