import { NextRequest, NextResponse } from "next/server";
import { costumeService } from "@/services/figurinoService";
import { handleError } from "@/errors/HandleError";

export async function GET() {
  try {
    const allCostumes = await costumeService.listAllCostumes();
    return NextResponse.json(allCostumes);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newCostume = await costumeService.registerCostume(body);
    return NextResponse.json(newCostume.data, {
      status: newCostume.status,
    });
  } catch (error) {
    return handleError(error);
  }
}
