import { userService } from "@/services/userService";
import { getValidIdFromParams } from "@/utils/getValidId/getValidIdFromParams";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber;
  const body = await req.json();
  try {
    const updatedPassword = await userService.updateUserPassword(
      idNumber,
      body
    );
    return NextResponse.json(updatedPassword.data, {
      status: updatedPassword.status,
    });
  } catch (err: any) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Erro ao atualizar usuario" },
      { status: 500 }
    );
  }
}
