import { Usuario } from "@/model/Usuario";
import { NextRequest, NextResponse } from "next/server";

//Api que retorna um usuario pelo ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await params;
    if (isNaN(id)) {
      return NextResponse.json({ message: "ID inválido" }, { status: 400 });
    }
    const usuario = await Usuario.getById(id);
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
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await params;
    if (isNaN(id)) {
      return NextResponse.json({ message: "ID inválido" }, { status: 400 });
    }
    const usuarioDeletado = await Usuario.delete(+id);
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
