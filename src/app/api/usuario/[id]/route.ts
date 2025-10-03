import { handleError } from "@/errors/HandleError";
import { User } from "@/model/Usuario";
import { userService } from "@/services/userService";
import { getValidIdFromParams } from "@/utils/getValidId/getValidIdFromParams";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber;
  try {
    const user = await User.getById(idNumber);
    return NextResponse.json(user);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber;
  const body = await req.json();
  try {
    const updatedUser = await userService.updateUserWithoutPassword(
      idNumber,
      body
    );
    return NextResponse.json(updatedUser.data, {
      status: updatedUser.status,
    });
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
    const deletedUser = await userService.deleteUser(idNumber);
    return NextResponse.json(deletedUser.data, { status: deletedUser.status });
  } catch (error) {
    return handleError(error);
  }
}
