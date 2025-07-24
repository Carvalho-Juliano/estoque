/*
  Warnings:

  - You are about to drop the column `fistName` on the `Usuario` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "fistName",
ADD COLUMN     "firstName" VARCHAR(255);
