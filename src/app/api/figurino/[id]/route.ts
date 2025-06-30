import { figurinoService } from "@/services/figurinoService";
import { getValidIdFromParams } from "@/utils/getValidId/getValidIdFromParams";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber;
  try {
    const figurino = await figurinoService.figurinoPeloId(idNumber);
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
  { params }: { params: Promise<{ id: string }> }
) {
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber;
  const body = await req.json();
  try {
    const figurinoAtualizado = await figurinoService.atualizarFigurino(
      idNumber,
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
  { params }: { params: Promise<{ id: string }> }
) {
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber;
  try {
    const figurinoDeletado = await figurinoService.deletarFigurino(idNumber);
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
