import { Cliente } from "@/model/Cliente";
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, telefone, email = null } = body;
    if (typeof nome !== "string" || typeof telefone !== "string") {
      return NextResponse.json(
        {
          message:
            "Erro ao cadastrar cliente, os campos nome e telefone devem ser preenchidos",
        },
        { status: 400 }
      );
    }
    const novoCliente = await Cliente.createCliente({ nome, telefone, email });
    return NextResponse.json(novoCliente, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao cadastrar cliente" },
      { status: 500 }
    );
  }
}
