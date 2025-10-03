import prisma from "@/lib/prisma";
import { Costume } from "./Figurino";
import { Client } from "./Cliente";
import { NotFoundError } from "@/errors/NotFoundError";

export interface DetailedLoan {
  id: number;
  clientName: string;
  costumeDescription: string;
  quantity: number;
  createdAt: Date;
}

export interface loanAttributes {
  id: number;
  costumeId: number;
  clientId: number;
  quantity: number;
  createdAt: Date;
}

export class Emprestimo {
  id: number;
  costumeId: number;
  clientId: number;
  quantity: number;
  createdAt: Date;

  constructor(attributes: loanAttributes) {
    this.id = attributes.id;
    this.costumeId = attributes.costumeId;
    this.clientId = attributes.clientId;
    this.quantity = attributes.quantity;
    this.createdAt = attributes.createdAt;
  }

  static async findAll() {
    const loans = await prisma.emprestimo.findMany({
      include: {
        client: {
          select: { name: true },
        },
        costume: {
          select: { description: true },
        },
      },
    });

    return loans.map((loan) => ({
      id: loan.id,
      quantity: loan.quantity,
      createdAt: loan.createdAt,
      clientName: loan.client.name,
      costumeDescription: loan.costume.description,
    }));
  }

  //Metodo para obter o total de items em emprestimo
  static async getTotalLoanQuantity() {
    const result = await prisma.emprestimo.aggregate({
      _sum: {
        quantity: true,
      },
    });

    return result._sum.quantity || 0;
  }

  static async registeredLoans() {
    const result = await prisma.emprestimo.count();
    return result;
  }

  //Função retornando um tipo mais detalhado de emprestimo, contendo o nome do cliente e a descrição do figurino cadastrado
  static async findById(id: number): Promise<DetailedLoan | null> {
    const loan = await prisma.emprestimo.findUnique({
      where: { id: +id },
      include: {
        client: true,
        costume: true,
      },
    });
    if (!loan) throw new NotFoundError("Emprestimo");

    return {
      id: loan.id,
      clientName: loan.client.name,
      costumeDescription: loan.costume.description,
      quantity: loan.quantity,
      createdAt: loan.createdAt,
    };
  }

  static async createLoan(
    costumeId: number,
    clientId: number,
    attributes: { quantity: number }
  ): Promise<Emprestimo> {
    const { quantity } = attributes;
    const costume = await Costume.getById(costumeId);
    if (!costume) {
      throw new NotFoundError("Figurino");
    }

    const cliente = await Client.getById(clientId);
    if (!cliente) {
      throw new NotFoundError("Cliente");
    }

    if (costume.available_quantity < quantity) {
      throw new Error(
        "Quantidade exigida no emprestimo é superior a quantidade disponível em estoque"
      );
    }
    await prisma.figurino.update({
      //atualizar a quantidade disponivel na tabela figurino.
      where: { id: +costumeId },
      data: {
        available_quantity: costume.available_quantity - quantity,
      },
    });

    const newLoan = await prisma.emprestimo.create({
      data: {
        costumeId,
        clientId,
        quantity,
      },
    });
    return newLoan;
  }

  static async deleteLoan(id: number): Promise<Emprestimo | null> {
    const loan = await prisma.emprestimo.findUnique({
      where: { id: +id },
    });
    if (!loan) throw new NotFoundError("Emprestimo");
    const costume = await prisma.figurino.findUnique({
      where: { id: loan.costumeId },
    });
    if (!costume) throw new NotFoundError("Figurino");
    await prisma.figurino.update({
      where: { id: costume.id },
      data: {
        available_quantity: costume.available_quantity + loan.quantity,
      },
    });
    const deletedLoan = await prisma.emprestimo.delete({
      where: { id: +id },
    });
    return deletedLoan;
  }
}
