import { NextResponse } from "next/server";

//Função criada para evitar a repetição de código nas APIS
export async function getValidIdFromParams(
  params: Promise<{ id: string }>
): Promise<number | NextResponse> {
  const { id } = await params;
  const idNumber = Number(id);
  if (isNaN(idNumber)) {
    return NextResponse.json({ mesage: "ID inválid" }, { status: 400 });
  }
  return idNumber;
}
