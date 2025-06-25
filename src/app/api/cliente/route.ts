import { clienteService } from "@/services/clienteService";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const todosClientes = await clienteService.listarTodos();
    return NextResponse.json(todosClientes);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao encontrar clientes" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const cadastrarCliente = await clienteService.cadastrar(body);
    return NextResponse.json(cadastrarCliente.data, {
      status: cadastrarCliente.status,
    });
  } catch (err: any) {
    if (err instanceof Error) {
      return NextResponse.json({ status: 400, message: err.message });
    }
  }
}
