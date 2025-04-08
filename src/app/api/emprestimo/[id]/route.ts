import { Emprestimo } from "@/model/Emprestimo";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await params;
    if (isNaN(id)) {
      return NextResponse.json({ message: "ID invalido" }, { status: 400 });
    }
    const emprestimo = await Emprestimo.findById(id);
    if (!emprestimo) {
      return NextResponse.json(
        { message: "Emprestimo não encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(emprestimo);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar emprestimo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await params;
    if (isNaN(id)) {
      return NextResponse.json({ message: "ID invalido" }, { status: 400 });
    }
    const emprestimoDeletado = await Emprestimo.delete(id);
    if (!emprestimoDeletado) {
      return NextResponse.json(
        { message: "Emprestimo não encontrado" },
        { status: 500 }
      );
    }
    return NextResponse.json(emprestimoDeletado);
  } catch (error) {
    console.log("Erro ao excluir figurino", error);
    return NextResponse.json(
      { message: "Erro ao Excluir emprestimo" },
      { status: 500 }
    );
  }
}
