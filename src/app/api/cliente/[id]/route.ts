import { Cliente } from "@/model/Cliente";
import { updateRequestSchemaCliente } from "@/schemas/cliente/clienteSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await params;
    if (isNaN(id)) {
      return NextResponse.json({ message: "ID inválido" }, { status: 400 });
    }
    const cliente = await Cliente.getById(id);
    if (!cliente) {
      return NextResponse.json(
        { message: "Cliente não encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(cliente);
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar cliente" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await params;
    if (isNaN(id)) {
      return NextResponse.json({ message: "ID inválido" }, { status: 400 });
    }
    const body = await req.json();
    const parsedBody = updateRequestSchemaCliente.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: "Erro na validação dos dados",
          error: parsedBody.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }
    const { nome, telefone, email } = parsedBody.data;
    const clienteAtualizado = await Cliente.updateCliente(id, {
      nome,
      email,
      telefone,
    });
    return NextResponse.json(clienteAtualizado, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao atualizar cliente" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await params;
    if (isNaN(id)) {
      return NextResponse.json({ message: "ID inválido" }, { status: 400 });
    }
    const clienteDeletado = await Cliente.delete(+id);
    if (!clienteDeletado) {
      return NextResponse.json(
        { message: "Cliente não encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(clienteDeletado, { status: 200 });
  } catch (error) {
    console.log("Erro ao excluir cliente", error);
    return NextResponse.json(
      { message: "Erro ao Excluir cliente" },
      { status: 500 }
    );
  }
}
