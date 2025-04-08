import { Usuario } from "@/model/Usuario";
import { NextRequest, NextResponse } from "next/server";

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
    const UsuarioDeletado = await Usuario.delete(id);
    if (!UsuarioDeletado) {
      return NextResponse.json(
        { message: "Usuario não encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(UsuarioDeletado);
  } catch {
    return NextResponse.json(
      { message: "Erro ao excluir Usuario" },
      { status: 500 }
    );
  }
}
