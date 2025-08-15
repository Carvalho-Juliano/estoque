import { NextResponse } from "next/server";
import {
  AlreadyExistError,
  NotFoundError,
  PendingLoanError,
} from "@/errors/CustomErrors";

export function handleError(error: any) {
  if (error instanceof AlreadyExistError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode }
    );
  }

  if (error instanceof NotFoundError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode }
    );
  }

  if (error instanceof PendingLoanError) {
    return NextResponse.json(
      { message: error.message },
      { status: error.statusCode }
    );
  }
  console.log(error);
  return NextResponse.json(
    { message: "Erro interno no servidor" },
    { status: 500 }
  );
}
