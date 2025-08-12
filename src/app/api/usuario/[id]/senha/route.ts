import { userService } from "@/services/userService";
import { getValidIdFromParams } from "@/utils/getValidId/getValidIdFromParams";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/usuario/{id}/senha:
 *   put:
 *     summary: Atualizar a senha de um usuário.
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
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Senha atualizado com sucesso.
 *       400:
 *         description: Erro na validação dos dados, algum campo inserido de forma incorreta, senha atual e nova senha iguais, senha atual incorreta.
 *       404:
 *         description: Usuário não encontrado.
 *       500:
 *         description: Erro ao atualizar senha.
 */

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber;
  const body = await req.json();
  try {
    const updatedPassword = await userService.updateUserPassword(
      idNumber,
      body
    );
    return NextResponse.json(updatedPassword.data, {
      status: updatedPassword.status,
    });
  } catch (err: any) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Erro ao atualizar usuario" },
      { status: 500 }
    );
  }
}
