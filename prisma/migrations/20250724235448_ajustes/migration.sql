/*
  Warnings:

  - You are about to drop the column `clienteId` on the `Emprestimo` table. All the data in the column will be lost.
  - You are about to drop the column `figurinoId` on the `Emprestimo` table. All the data in the column will be lost.
  - You are about to drop the column `quantidade` on the `Emprestimo` table. All the data in the column will be lost.
  - Added the required column `clientId` to the `Emprestimo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costumeId` to the `Emprestimo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Emprestimo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Emprestimo" DROP CONSTRAINT "Emprestimo_clienteId_fkey";

-- DropForeignKey
ALTER TABLE "Emprestimo" DROP CONSTRAINT "Emprestimo_figurinoId_fkey";

-- AlterTable
ALTER TABLE "Emprestimo" DROP COLUMN "clienteId",
DROP COLUMN "figurinoId",
DROP COLUMN "quantidade",
ADD COLUMN     "clientId" INTEGER NOT NULL,
ADD COLUMN     "costumeId" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Emprestimo" ADD CONSTRAINT "Emprestimo_costumeId_fkey" FOREIGN KEY ("costumeId") REFERENCES "Figurino"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Emprestimo" ADD CONSTRAINT "Emprestimo_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
