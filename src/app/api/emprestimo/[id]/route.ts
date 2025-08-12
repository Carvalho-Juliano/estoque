import { loanService } from "@/services/emprestimoService";
import { getValidIdFromParams } from "@/utils/getValidId/getValidIdFromParams";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/emprestimo/{id}:
 *   get:
 *     summary: Obtem um emprestimo pelo ID.
 *     tags: [Emprestimo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do emprestimo
 *     responses:
 *       200:
 *         description: Emprestimo retornado com sucesso.
 *       404:
 *         description: Emprestimo não encontrado.
 *       500:
 *         description: Erro ao encontrar emprestimo.
 *   delete:
 *     summary: Excluir um emprestimo.
 *     tags: [Emprestimo]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do emprestimo
 *     responses:
 *       200:
 *         description: Emprestimo excluído com sucesso.
 *       404:
 *         description: Emprestimo não encontrado.
 *       500:
 *         description: Erro ao excluir emprestimo.
 */

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber;
  try {
    const loan = await loanService.loanById(idNumber);
    return NextResponse.json(loan.data, { status: loan.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro ao buscar emprestimo" },
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
    const detailedLoan = await loanService.deleteLoan(idNumber);
    return NextResponse.json(detailedLoan.data, {
      status: detailedLoan.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro ao Excluir emprestimo" },
      { status: 500 }
    );
  }
}
