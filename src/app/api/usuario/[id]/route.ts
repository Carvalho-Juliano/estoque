import { Usuario } from "@/model/Usuario";
import { userService } from "@/services/userService";
import { getValidIdFromParams } from "@/utils/getValidId/getValidIdFromParams";
import { NextRequest, NextResponse } from "next/server";

//Api que retorna um usuario pelo ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber;
  try {
    const user = await Usuario.getById(idNumber);
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
    const deletedUser = await Usuario.delete(idNumber);
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
