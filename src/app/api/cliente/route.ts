import { Cliente } from "@/model/Cliente";
import { createRequestSchemaCliente } from "@/schemas/cliente/clienteSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const clientes = await Cliente.findAll();
    return NextResponse.json(clientes);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao encontrar clientes" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedBody = createRequestSchemaCliente.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: "Erro na validação dos dados",
          errors: parsedBody.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
    const { nome, telefone, email = null } = parsedBody.data;
    const novoCliente = await Cliente.createCliente({ nome, telefone, email });
    return NextResponse.json(novoCliente, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao cadastrar cliente" },
      { status: 500 }
    );
  }
}
