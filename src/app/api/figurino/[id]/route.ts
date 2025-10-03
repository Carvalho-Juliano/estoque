import { handleError } from "@/errors/HandleError";
import { costumeService } from "@/services/figurinoService";
import { getValidIdFromParams } from "@/utils/getValidId/getValidIdFromParams";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber;
  try {
    const costume = await costumeService.costumeById(idNumber);
    return NextResponse.json(costume.data, { status: costume.status });
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
    const updatedCostume = await costumeService.updateCostume(idNumber, body);
    return NextResponse.json(updatedCostume.data, {
      status: updatedCostume.status,
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
    const deletedCostume = await costumeService.deleteCostume(idNumber);
    return NextResponse.json(deletedCostume.data, {
      status: deletedCostume.status,
    });
  } catch (error) {
    return handleError(error);
  }
}
