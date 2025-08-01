import { Emprestimo } from "@/model/Emprestimo";
import { loanService } from "@/services/emprestimoService";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const loan = await Emprestimo.findAll();
    return NextResponse.json(loan);
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
    const newLoan = await loanService.registerLoan(body);
    return NextResponse.json(newLoan.data, {
      status: newLoan.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro ao criar o emprestimo" },
      { status: 500 }
    );
  }
}
