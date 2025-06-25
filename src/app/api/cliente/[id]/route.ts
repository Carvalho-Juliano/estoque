import { clienteService } from "@/services/clienteService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ message: "ID inválido" }, { status: 400 });
  }
  try {
    const cliente = await clienteService.clientePeloId(id);
    return NextResponse.json(cliente.data, { status: cliente.status });
  } catch (err: any) {
    if (err instanceof Error) {
      return NextResponse.json({ status: 500, message: err.message });
    }
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
    const clienteAtualizado = await clienteService.atualizarCliente(id, body);
    return NextResponse.json(clienteAtualizado.data, {
      status: clienteAtualizado.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro ao atualizar cliente" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ message: "ID inválido" }, { status: 400 });
  }
  try {
    const clienteDeletado = await clienteService.excluirCliente(id);
    return NextResponse.json(clienteDeletado.data, {
      status: clienteDeletado.status,
    });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro ao Excluir cliente" },
      { status: 500 }
    );
  }
}
