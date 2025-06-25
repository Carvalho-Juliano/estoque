import { NextRequest, NextResponse } from "next/server";
import { figurinoService } from "@/services/figurinoService";

export async function GET() {
  try {
    const todosFigurinos = await figurinoService.listarTodosFigurinos();
    return NextResponse.json(todosFigurinos);
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
    const novoFigurino = await figurinoService.cadastrarFigurino(body);
    return NextResponse.json(novoFigurino.data, {
      status: novoFigurino.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro ao criar figurino." },
      { status: 500 }
    );
  }
}
