/*
  Warnings:

  - Made the column `lastName` on table `Usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Usuario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `firstName` on table `Usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Usuario" ALTER COLUMN "lastName" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "firstName" SET NOT NULL;
