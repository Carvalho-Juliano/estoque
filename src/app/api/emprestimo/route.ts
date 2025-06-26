import { Emprestimo } from "@/model/Emprestimo";
import { createRequestSchemaEmprestimo } from "@/schemas/emprestimo/emprestimoSchema";
import { emprestimoService } from "@/services/emprestimoService";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const novoEmprestimo = await emprestimoService.cadastrarEmprestimo(body);
    return NextResponse.json(novoEmprestimo.data, {
      status: novoEmprestimo.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro ao criar o emprestimo" },
      { status: 500 }
    );
  }
}
