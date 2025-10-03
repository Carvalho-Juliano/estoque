import { handleError } from "@/errors/HandleError";
import { clientService } from "@/services/clienteService";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const listedClients = await clientService.listAllClients();
    return NextResponse.json(listedClients);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const registerClient = await clientService.register(body);
    return NextResponse.json(registerClient.data, {
      status: registerClient.status,
    });
  } catch (error) {
    return handleError(error);
  }
}
