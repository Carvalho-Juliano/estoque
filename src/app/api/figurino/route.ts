import { NextRequest, NextResponse } from "next/server";
import { costumeService } from "@/services/figurinoService";

/**
 * @swagger
 * /api/figurino:
 *   get:
 *     summary: Lista todos os figurinos.
 *     tags: [Figurino]
 *     responses:
 *       200:
 *         description: Lista de figurinos retornada com sucesso.
 *   post:
 *     summary: Cadastra um novo figurino.
 *     tags: [Figurino]
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
 *       201:
 *         description: Figurino cadastrado com sucesso.
 *       400:
 *         description: Erro na validação dos dados, algum campo inserido de forma incorreta ou tentativa de cadastrar algum email/telefone já existente.
 *       500:
 *         description: Erro ao cadastrar cliente.
 */

export async function GET() {
  try {
    const allCostumes = await costumeService.listAllCostumes();
    return NextResponse.json(allCostumes);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro ao buscar figurinos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newCostume = await costumeService.registerCostume(body);
    return NextResponse.json(newCostume.data, {
      status: newCostume.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro ao criar figurino." },
      { status: 500 }
    );
  }
}
