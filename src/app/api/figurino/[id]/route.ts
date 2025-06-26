import { figurinoService } from "@/services/figurinoService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ message: "ID inválido" }, { status: 400 });
    }
    const figurino = await figurinoService.figurinoPeloId(id);
    return NextResponse.json(figurino.data, { status: figurino.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro ao buscar figurinos" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ message: "Id inválido" }, { status: 400 });
    }
    const body = await req.json();
    const figurinoAtualizado = await figurinoService.atualizarFigurino(
      id,
      body
    );
    return NextResponse.json(figurinoAtualizado.data, {
      status: figurinoAtualizado.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro ao atualizar o figurino" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json({ message: "ID inválido" }, { status: 400 });
    }
    const figurinoDeletado = await figurinoService.deletarFigurino(id);
    return NextResponse.json(figurinoDeletado.data, {
      status: figurinoDeletado.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro ao excluir figurino!" },
      { status: 500 }
    );
  }
}
