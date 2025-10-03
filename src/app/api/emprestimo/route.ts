import { handleError } from "@/errors/HandleError";
import { Emprestimo } from "@/model/Emprestimo";
import { loanService } from "@/services/emprestimoService";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const loan = await Emprestimo.findAll();
    return NextResponse.json(loan);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newLoan = await loanService.registerLoan(body);
    return NextResponse.json(newLoan.data, {
      status: newLoan.status,
    });
  } catch (error) {
    return handleError(error);
  }
}
