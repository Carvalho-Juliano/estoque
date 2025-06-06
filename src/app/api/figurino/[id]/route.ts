import { Figurino } from "@/model/Figurino";
import { updateRequestSchemaFigurino } from "@/schemas/figurino/figurinoSchema";
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
    const figurino = await Figurino.getById(id);
    if (!figurino)
      return NextResponse.json(
        { message: "Figurino não encontrado" },
        { status: 404 }
      );
    return NextResponse.json(figurino);
  } catch (error) {
    console.log("Erro ao excluir figurino", error);
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
      return NextResponse.json(
        { message: "Id não encontrado" },
        { status: 400 }
      );
    }
    const body = await req.json();
    const parsedBody = updateRequestSchemaFigurino.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: "Erro na validação dos dados",
          errors: parsedBody.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
    const figurinoAtualizado = await Figurino.updateFigurino(id, body);
    return NextResponse.json(figurinoAtualizado, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao atualizar o figurino" },
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
    const figurinoDeletado = await Figurino.delete(id);
    if (!figurinoDeletado) {
      return NextResponse.json(
        { message: "Figurino não encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(figurinoDeletado, { status: 200 });
  } catch (error) {
    console.log("Erro ao excluir figurino", error);
    return NextResponse.json(
      { message: "Erro ao excluir figurino!" },
      { status: 500 }
    );
  }
}
