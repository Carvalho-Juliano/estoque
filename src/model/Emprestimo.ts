import prisma from "@/lib/prisma";

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
    return await prisma.emprestimo.findMany();
  }

  static async findById(id: number): Promise<Emprestimo | null> {
    const emprestimo = await prisma.emprestimo.findUnique({
      where: { id: +id },
    });
    if (!emprestimo) return null;
    return emprestimo;
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

    if (figurino.quantidade < quantidade)
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
    const emprestimoDeletedo = await prisma.emprestimo.delete({
      where: { id: +id },
    });
    if (!emprestimoDeletedo) return null;
    return emprestimoDeletedo;
  }
}
