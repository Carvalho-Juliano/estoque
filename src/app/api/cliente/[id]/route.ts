import { clientService } from "@/services/clienteService";
import { getValidIdFromParams } from "@/utils/getValidId/getValidIdFromParams";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/cliente/{id}:
 *   get:
 *     summary: Obtem um cliente pelo ID
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Lista de clientes retornada com sucesso.
 *       404:
 *         description: Cliente não encontrado.
 *       500:
 *         description: Erro ao buscar cliente.
 *   put:
 *     summary: Atualizar um cliente
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cliente atualizado com sucesso.
 *       400:
 *         description: Erro na validação dos dados, algum campo inserido de forma incorreta ou tentativa de cadastrar algum email/telefone já existente.
 *       404:
 *         description: Cliente não encontrado.
 *       500:
 *         description: Erro ao atualizar cliente.
 *   delete:
 *     summary: Excluir um cliente
 *     tags: [Cliente]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do cliente
 *     responses:
 *       200:
 *         description: Cliente excluído com sucesso.
 *       400:
 *         description: Este cliente tem um emprestimo pendente, resolva esta pendência antes de tentar excluí-lo.
 *       404:
 *         description: Cliente não encontrado.
 *       500:
 *         description: Erro ao excluir cliente.
 */

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const idNumber = await getValidIdFromParams(params);
  if (idNumber instanceof NextResponse) return idNumber; //se a função retornar uma resposta HTTP, significa que o id foi inválido e a função retornará o erro HTTP 400, caso contrario a função segue o fluxo normalmente.
  try {
    const client = await clientService.clientById(idNumber);
    return NextResponse.json(client.data, { status: client.status });
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
    const updatedClient = await clientService.updateClient(idNumber, body);
    return NextResponse.json(updatedClient.data, {
      status: updatedClient.status,
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
    const deletedClient = await clientService.deleteClient(idNumber);
    return NextResponse.json(deletedClient.data, {
      status: deletedClient.status,
    });
  } catch (err: any) {
    if (err instanceof Error) {
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Erro ao Excluir cliente" },
      { status: 500 }
    );
  }
}
