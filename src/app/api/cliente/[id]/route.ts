import { clienteService } from "@/services/clienteService";
import { getValidIdFromParams } from "@/utils/getValidId/getValidIdFromParams";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, params: Promise<{ id: string }>) {
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber; //se a função retornar uma resposta HTTP, significa que o id foi inválido e a função retornará o erro HTTP 400, caso contrario a função segue o fluxo normalmente.
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
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber;
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
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber;
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
