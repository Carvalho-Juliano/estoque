import { costumeService } from "@/services/figurinoService";
import { getValidIdFromParams } from "@/utils/getValidId/getValidIdFromParams";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/figurino/{id}:
 *   get:
 *     summary: Obtem um figurino pelo ID.
 *     tags: [Figurino]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do figurino
 *     responses:
 *       200:
 *         description: Lista de figurinos retornada com sucesso.
 *       404:
 *         description: Figurino não encontrado.
 *       500:
 *         description: Erro ao buscar figurino.
 *   put:
 *     summary: Atualizar um figurino.
 *     tags: [Figurino]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do figurino
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               quantity:
 *                 type: string
 *               size:
 *                 type: string
 *               available_quantity:
 *                 type: string
 *     responses:
 *       200:
 *         description: Figurino atualizado com sucesso.
 *       400:
 *         description: Erro na validação dos dados, algum campo inserido de forma incorreta ou tentativa de cadastrar algum email/telefone já existente.
 *       404:
 *         description: Figurino não encontrado.
 *       500:
 *         description: Erro ao atualizar figurino.
 *   delete:
 *     summary: Excluir um figurino.
 *     tags: [Figurino]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do figurino
 *     responses:
 *       200:
 *         description: Figurino excluído com sucesso.
 *       400:
 *         description: Este figurino tem um emprestimo pendente, resolva esta pendência antes de tentar excluí-lo.
 *       404:
 *         description: Figurino não encontrado.
 *       500:
 *         description: Erro ao excluir figurino.
 */

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber;
  try {
    const costume = await costumeService.costumeById(idNumber);
    return NextResponse.json(costume.data, { status: costume.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro ao buscar figurinos" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber;
  const body = await req.json();
  try {
    const updatedCostume = await costumeService.updateCostume(idNumber, body);
    return NextResponse.json(updatedCostume.data, {
      status: updatedCostume.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro ao atualizar o figurino" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber;
  try {
    const deletedCostume = await costumeService.deleteCostume(idNumber);
    return NextResponse.json(deletedCostume.data, {
      status: deletedCostume.status,
    });
  } catch (err: any) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Erro ao excluir figurino!" },
      { status: 500 }
    );
  }
}
