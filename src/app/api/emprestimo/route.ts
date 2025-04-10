import { Emprestimo } from "@/model/Emprestimo";
import { createRequestSchemaEmprestimo } from "@/schemas/emprestimo/emprestimoSchema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const emprestimos = await Emprestimo.findAll();
    return NextResponse.json(emprestimos);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar os emprestimos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedBody = createRequestSchemaEmprestimo.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: "Erro na validação dos dados",
          errors: parsedBody.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
    const { clienteId, figurinoId, quantidade } = parsedBody.data;
    const novoEmprestimo = await Emprestimo.createEmprestimo(
      figurinoId,
      clienteId,
      { quantidade }
    );
    return NextResponse.json(novoEmprestimo, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao criar o emprestimo" },
      { status: 500 }
    );
  }
}
