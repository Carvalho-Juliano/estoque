import { emprestimoService } from "@/services/emprestimoService";
import { getValidIdFromParams } from "@/utils/getValidId/getValidIdFromParams";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber;
  try {
    const emprestimo = await emprestimoService.emprestimoPeloId(idNumber);
    return NextResponse.json(emprestimo.data, { status: emprestimo.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar emprestimo" },
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
    const emprestimoDeletado = await emprestimoService.deletarEmprestimo(
      idNumber
    );
    return NextResponse.json(emprestimoDeletado.data, {
      status: emprestimoDeletado.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro ao Excluir emprestimo" },
      { status: 500 }
    );
  }
}
