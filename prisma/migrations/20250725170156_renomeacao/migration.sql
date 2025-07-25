/*
  Warnings:

  - You are about to drop the column `nome` on the `Cliente` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Cliente` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Cliente` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `Cliente` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Cliente_telefone_key";

-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "nome",
DROP COLUMN "telefone",
ADD COLUMN     "name" VARCHAR(255) NOT NULL,
ADD COLUMN     "phone" VARCHAR(255) NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_phone_key" ON "Cliente"("phone");
