import { handleError } from "@/errors/HandleError";
import { clientService } from "@/services/clienteService";
import { getValidIdFromParams } from "@/utils/getValidId/getValidIdFromParams";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber; //se a função retornar uma resposta HTTP, significa que o id foi inválido e a função retornará o erro HTTP 400, caso contrario a função segue o fluxo normalmente.
  try {
    const client = await clientService.clientById(idNumber);
    return NextResponse.json(client.data, { status: client.status });
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
  try {
    const body = await req.json();
    const updatedClient = await clientService.updateClient(idNumber, body);
    return NextResponse.json(updatedClient.data, {
      status: updatedClient.status,
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
    const deletedClient = await clientService.deleteClient(idNumber);
    return NextResponse.json(deletedClient.data, {
      status: deletedClient.status,
    });
  } catch (error) {
    return handleError(error);
  }
}
