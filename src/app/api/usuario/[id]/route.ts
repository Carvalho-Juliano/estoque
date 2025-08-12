import { User } from "@/model/Usuario";
import { userService } from "@/services/userService";
import { getValidIdFromParams } from "@/utils/getValidId/getValidIdFromParams";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/usuario/{id}:
 *   get:
 *     summary: Obtem um usuário pelo ID.
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao buscar usuário.
 *   put:
 *     summary: Atualizar um usuário sem a senha.
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
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
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso.
 *       400:
 *         description: Erro na validação dos dados, algum campo inserido de forma incorreta ou tentativa de cadastrar algum email/telefone já existente.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao atualizar figurino.
 *   delete:
 *     summary: Excluir um usuário.
 *     tags: [Usuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao excluir usuário.
 */

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber;
  try {
    const user = await User.getById(idNumber);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar usuario" },
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
    const updatedUser = await userService.updateUserWithoutPassword(
      idNumber,
      body
    );
    return NextResponse.json(updatedUser.data, {
      status: updatedUser.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro ao atualizar usuário" },
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
    const deletedUser = await User.delete(idNumber);
    if (!deletedUser) {
      return NextResponse.json(
        { message: "Usuario não encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(deletedUser, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Erro ao excluir Usuario" },
      { status: 500 }
    );
  }
}
