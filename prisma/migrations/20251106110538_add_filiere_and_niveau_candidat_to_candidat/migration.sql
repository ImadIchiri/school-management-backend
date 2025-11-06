/*
  Warnings:

  - Added the required column `filiere` to the `Candidat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `niveau` to the `Candidat` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "NiveauCandidat" AS ENUM ('BACHELOR_1', 'BACHELOR_2', 'BACHELOR_3', 'MASTER_1', 'MASTER_2', 'MASTER_3');

-- AlterTable
ALTER TABLE "Candidat" ADD COLUMN     "filiere" TEXT NOT NULL,
ADD COLUMN     "niveau" "NiveauCandidat" NOT NULL;
