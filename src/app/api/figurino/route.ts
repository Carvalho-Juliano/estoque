import { Figurino } from "@/model/Figurino";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const figurinos = await Figurino.findAll();
    return NextResponse.json(figurinos);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar figurinos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { descricao, quantidade, tamanho, disponivel } = body;
    if (
      typeof descricao !== "string" ||
      typeof quantidade !== "number" ||
      typeof tamanho !== "string" ||
      typeof disponivel !== "number"
    ) {
      return NextResponse.json(
        {
          message:
            "Erro ao criar figurino, todos os campo devem ser preenchidos",
        },
        { status: 400 }
      );
    }
    const novoFigurino = await Figurino.createFigurino(body);
    return NextResponse.json(novoFigurino, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao criar figurino." },
      { status: 500 }
    );
  }
}
