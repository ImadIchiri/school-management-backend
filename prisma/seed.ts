import prisma from "../src/config/prisma.ts";
import { seedInitialTables } from "./seedInitialTables.ts";
import { seedPermissions } from "./seedPermissions.ts";

async function main() {
  await seedInitialTables();
  await seedPermissions();
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
