import { Usuario } from "@/model/Usuario";
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
    const usuario = await Usuario.getById(idNumber);
    return NextResponse.json(usuario);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar usuario" },
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
    const usuarioDeletado = await Usuario.delete(idNumber);
    if (!usuarioDeletado) {
      return NextResponse.json(
        { message: "Usuario não encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(usuarioDeletado, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Erro ao excluir Usuario" },
      { status: 500 }
    );
  }
}
