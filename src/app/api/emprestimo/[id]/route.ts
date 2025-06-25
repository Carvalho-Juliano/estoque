import { emprestimoService } from "@/services/emprestimoService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ message: "ID invalido" }, { status: 400 });
  }
  try {
    const emprestimo = await emprestimoService.emprestimoPeloId(id);
    return NextResponse.json(emprestimo.data, { status: emprestimo.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar emprestimo" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ message: "ID invalido" }, { status: 400 });
  }
  try {
    const emprestimoDeletado = await emprestimoService.deletarEmprestimo(id);
    return NextResponse.json(emprestimoDeletado.data, {
      status: emprestimoDeletado.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro ao Excluir emprestimo" },
      { status: 500 }
    );
  }
}
