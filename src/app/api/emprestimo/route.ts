import { Emprestimo } from "@/model/Emprestimo";
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
    const res = await req.json();
    const { clienteId, figurinoId, quantidade } = res;

    if (
      typeof clienteId !== "number" ||
      typeof figurinoId !== "number" ||
      typeof quantidade !== "number"
    ) {
      return NextResponse.json({ message: "Dados invalidos" }, { status: 400 });
    }
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
