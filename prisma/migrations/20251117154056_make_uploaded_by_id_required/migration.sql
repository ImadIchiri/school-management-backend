/*
  Warnings:

  - Made the column `uploadedById` on table `Ressource` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Ressource" DROP CONSTRAINT "Ressource_uploadedById_fkey";

-- AlterTable
ALTER TABLE "Ressource" ALTER COLUMN "uploadedById" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Ressource" ADD CONSTRAINT "Ressource_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
