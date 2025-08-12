import { NextRequest, NextResponse } from "next/server";
import { costumeService } from "@/services/figurinoService";

export async function GET() {
  try {
    const allCostumes = await costumeService.listAllCostumes();
    return NextResponse.json(allCostumes);
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro ao buscar figurinos" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newCostume = await costumeService.registerCostume(body);
    return NextResponse.json(newCostume.data, {
      status: newCostume.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro ao criar figurino." },
      { status: 500 }
    );
  }
}
