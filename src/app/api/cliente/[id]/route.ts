import { clienteService } from "@/services/clienteService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const idNumber = Number(id);
  if (isNaN(idNumber)) {
    return NextResponse.json({ message: "ID inválido" }, { status: 400 });
  }
  try {
    const cliente = await clienteService.clientePeloId(idNumber);
    return NextResponse.json(cliente.data, { status: cliente.status });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Erro ao encontrar o cliente" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const idNumber = Number(id);
  if (isNaN(idNumber)) {
    return NextResponse.json({ message: "ID inválido" }, { status: 400 });
  }
  try {
    const body = await req.json();
    const clienteAtualizado = await clienteService.atualizarCliente(
      idNumber,
      body
    );
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
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const idNumber = Number(id);
  if (isNaN(idNumber)) {
    return NextResponse.json({ message: "ID inválido" }, { status: 400 });
  }
  try {
    const clienteDeletado = await clienteService.excluirCliente(idNumber);
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
