/*
  Warnings:

  - You are about to drop the column `descricao` on the `Figurino` table. All the data in the column will be lost.
  - You are about to drop the column `disponivel` on the `Figurino` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade` on the `Figurino` table. All the data in the column will be lost.
  - You are about to drop the column `tamanho` on the `Figurino` table. All the data in the column will be lost.
  - Added the required column `available_quantity` to the `Figurino` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Figurino` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Figurino` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Figurino` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Figurino" DROP COLUMN "descricao",
DROP COLUMN "disponivel",
DROP COLUMN "quantidade",
DROP COLUMN "tamanho",
ADD COLUMN     "available_quantity" INTEGER NOT NULL,
ADD COLUMN     "description" VARCHAR(255) NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL;
