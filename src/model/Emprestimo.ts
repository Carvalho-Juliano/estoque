import prisma from "@/lib/prisma";
import { Costume } from "./Figurino";
import { Cliente } from "./Cliente";

export interface EmprestimoDetalhado {
  id: number;
  clienteNome: string;
  figurinoDescricao: string;
  quantidade: number;
  createdAt: Date;
}

export interface AtributosEmprestimo {
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
          select: { description: true },
        },
      },
    });

    return emprestimos.map((emprestimo) => ({
      id: emprestimo.id,
      quantidade: emprestimo.quantidade,
      createdAt: emprestimo.createdAt,
      clienteNome: emprestimo.cliente.nome,
      figurinoDescricao: emprestimo.figurino.description,
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
      figurinoDescricao: emprestimo.figurino.description,
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
    const figurino = await Costume.getById(figurinoId);
    if (!figurino)
      throw { field: "figurinoId", message: "Figurino nao encontrado!" };

    const cliente = await Cliente.getById(clienteId);
    if (!cliente)
      throw { field: "clienteId", message: "Cliente nao encontrado!" };

    if (figurino.available_quantity < quantidade)
      throw { field: "quantidade", message: "Quantidade indisponível!" };
    await prisma.figurino.update({
      //atualizar a quantidade disponivel na tabela figurino.
      where: { id: +figurinoId },
      data: {
        available_quantity: figurino.available_quantity - quantidade,
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
        available_quantity: figurino.available_quantity + emprestimo.quantidade,
      },
    });
    const emprestimoDeletedo = await prisma.emprestimo.delete({
      where: { id: +id },
    });
    if (!emprestimoDeletedo) return null;
    return emprestimoDeletedo;
  }
}
