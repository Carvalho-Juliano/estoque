import { handleError } from "@/errors/HandleError";
import { loanService } from "@/services/emprestimoService";
import { getValidIdFromParams } from "@/utils/getValidId/getValidIdFromParams";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber;
  try {
    const loan = await loanService.loanById(idNumber);
    return NextResponse.json(loan.data, { status: loan.status });
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber;
  try {
    const detailedLoan = await loanService.deleteLoan(idNumber);
    return NextResponse.json(detailedLoan.data, {
      status: detailedLoan.status,
    });
  } catch (error) {
    return handleError(error);
  }
}
