import { User } from "@/model/Usuario";
import { userService } from "@/services/userService";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/usuario:
 *   get:
 *     summary: Lista todos os usuarios.
 *     tags: [Usuario]
 *     responses:
 *       200:
 *         description: Lista de usuarios retornada com sucesso.
 *   post:
 *     summary: Cadastra um novo usuario.
 *     tags: [Usuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usario cadastrado com sucesso.
 *       400:
 *         description: Erro na validação dos dados, algum campo inserido de forma incorreta ou tentativa de cadastrar algum email/telefone já existente.
 *       500:
 *         description: Erro ao cadastrar usuário.
 */

export async function GET() {
  try {
    const users = await User.findAll();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar Usuarios" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const registerNewUser = await userService.create(body);
    return NextResponse.json(registerNewUser, { status: 201 });
  } catch (err: any) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Erro ao criar usuário!" },
      { status: 500 }
    );
  }
}
