import { Figurino } from "@/model/Figurino";
import { NextRequest, NextResponse } from "next/server";
import { createRequestSchemaFigurino } from "@/schemas/figurino/figurinoSchema";

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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedBody = createRequestSchemaFigurino.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: "Erro na validação dos dados",
          errors: parsedBody.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
    const { descricao, quantidade, tamanho, disponivel } = parsedBody.data;
    const novoFigurino = await Figurino.createFigurino({
      descricao,
      quantidade,
      tamanho,
      disponivel,
    });
    return NextResponse.json(novoFigurino, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao criar figurino." },
      { status: 500 }
    );
  }
}
