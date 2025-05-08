import prisma from "@/lib/prisma";

type EmprestimoDetalhado = {
  id: Number;
  clienteNome: string;
  figurinoDescricao: string;
  quantidade: number;
  createdAt: Date;
};

interface AtributosEmprestimo {
  id: number;
  figurinoId: number;
  clienteId: number;
  quantidade: number;
  createdAt: Date;
}

export class Emprestimo {
  id: number;
  figurinoId: number;
  clienteId: number;
  quantidade: number;
  createdAt: Date;

  constructor(attributes: AtributosEmprestimo) {
    this.id = attributes.id;
    this.figurinoId = attributes.figurinoId;
    this.clienteId = attributes.clienteId;
    this.quantidade = attributes.quantidade;
    this.createdAt = attributes.createdAt;
  }

  static async findAll() {
    const emprestimos = await prisma.emprestimo.findMany({
      include: {
        cliente: {
          select: { nome: true },
        },
        figurino: {
          select: { descricao: true },
        },
      },
    });

    return emprestimos.map((emprestimo) => ({
      id: emprestimo.id,
      quantidade: emprestimo.quantidade,
      createdAt: emprestimo.createdAt,
      clienteNome: emprestimo.cliente.nome,
      figurinoDescricao: emprestimo.figurino.descricao,
    }));
  }

  //Metodo para obter o total de items em emprestimo
  static async getTotalEmprestimos() {
    const result = await prisma.emprestimo.aggregate({
      _sum: {
        quantidade: true,
      },
    });

    return result._sum.quantidade || 0;
  }

  //Função retornando um tipo mais detalhado de emprestimo, contendo o nome do cliente e a descrição do figurino cadastrado
  static async findById(id: number): Promise<EmprestimoDetalhado | null> {
    const emprestimo = await prisma.emprestimo.findUnique({
      where: { id: +id },
      include: {
        cliente: true,
        figurino: true,
      },
    });
    if (!emprestimo) return null;

    return {
      id: emprestimo.id,
      clienteNome: emprestimo.cliente.nome,
      figurinoDescricao: emprestimo.figurino.descricao,
      quantidade: emprestimo.quantidade,
      createdAt: emprestimo.createdAt,
    };
  }

  static async createEmprestimo(
    figurinoId: number,
    clienteId: number,
    attributes: { quantidade: number }
  ): Promise<Emprestimo> {
    const { quantidade } = attributes;
    const figurino = await prisma.figurino.findUnique({
      where: { id: +figurinoId },
    });
    if (!figurino) throw new Error("Figurino não encontrado!");

    const cliente = await prisma.cliente.findUnique({
      where: { id: +clienteId },
    });
    if (!cliente) throw new Error("Cliente não encontrado!");

    if (figurino.disponivel < quantidade)
      throw new Error("Quantidade indisponível");
    await prisma.figurino.update({
      //atualizar a quantidade disponivel na tabela figurino.
      where: { id: +figurinoId },
      data: {
        disponivel: figurino.disponivel - quantidade,
      },
    });

    const newEmprestimo = await prisma.emprestimo.create({
      data: {
        figurinoId,
        clienteId,
        quantidade,
      },
    });
    return newEmprestimo;
  }

  static async delete(id: number): Promise<Emprestimo | null> {
    const emprestimo = await prisma.emprestimo.findUnique({
      where: { id: +id },
    });
    if (!emprestimo) return null;
    const figurino = await prisma.figurino.findUnique({
      where: { id: emprestimo.figurinoId },
    });
    if (!figurino) throw new Error("Figurino associado nao encontrado");
    await prisma.figurino.update({
      //atualizar a quantidade disponivel na tabela figurino.
      where: { id: figurino.id },
      data: {
        disponivel: figurino.disponivel + emprestimo.quantidade,
      },
    });
    const emprestimoDeletedo = await prisma.emprestimo.delete({
      where: { id: +id },
    });
    if (!emprestimoDeletedo) return null;
    return emprestimoDeletedo;
  }
}
