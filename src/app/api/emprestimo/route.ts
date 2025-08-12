import { Emprestimo } from "@/model/Emprestimo";
import { loanService } from "@/services/emprestimoService";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/emprestimo:
 *   get:
 *     summary: Lista todos os emprestimos.
 *     tags: [Emprestimo]
 *     responses:
 *       200:
 *         description: Lista de emprestimo retornada com sucesso.
 *   post:
 *     summary: Cadastra um novo emprestimo.
 *     tags: [Emprestimo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               costumeId:
 *                 type: number
 *               clientId:
 *                 type: number
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Emprestimo cadastrado com sucesso.
 *       400:
 *         description: Erro na validação dos dados, algum campo inserido de forma incorreta ou tentativa de cadastrar algum email/telefone já existente.
 *       404:
 *         description: Figurino não encontrado, Cliente não encontrado, Quantidade exigida no emprestimo é superior a quantidade disponível em estoque.
 *       500:
 *         description: Erro ao cadastrar emprestimo.
 */

export async function GET() {
  try {
    const loan = await Emprestimo.findAll();
    return NextResponse.json(loan);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar os emprestimos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newLoan = await loanService.registerLoan(body);
    return NextResponse.json(newLoan.data, {
      status: newLoan.status,
    });
  } catch (err: any) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Erro ao criar o emprestimo" },
      { status: 500 }
    );
  }
}
