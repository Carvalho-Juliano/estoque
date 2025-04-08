import prisma from "@/lib/prisma";

interface AtributosCliente {
  id: number;
  nome: string;
  email: string | null;
  telefone: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Cliente {
  id: number;
  nome: string;
  email: string | null;
  telefone: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(attributes: AtributosCliente) {
    this.id = attributes.id;
    this.nome = attributes.nome;
    this.email = attributes.email;
    this.telefone = attributes.telefone;
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
  }

  static async findAll() {
    return await prisma.cliente.findMany();
  }

  static async getById(id: number): Promise<Cliente | null> {
    const cliente = await prisma.cliente.findUnique({ where: { id } });
    if (!cliente) return null;
    return cliente;
  }

  static async createCliente(
    attributes: Omit<AtributosCliente, "id" | "createdAt" | "updatedAt">
  ): Promise<Cliente> {
    const { nome, email, telefone } = attributes;
    const newCliente = await prisma.cliente.create({
      data: {
        nome,
        email,
        telefone,
      },
    });
    return newCliente;
  }

  static async updateCliente(
    id: number,
    attributes: Partial<
      Omit<AtributosCliente, "id" | "createdAt" | "updatedAt">
    >
  ): Promise<Cliente | null> {
    const cliente = await prisma.cliente.findUnique({ where: { id } });
    if (!cliente) return null;
    const updatedCliente = await prisma.cliente.update({
      where: { id },
      data: {
        ...attributes,
        updatedAt: new Date(),
      },
    });
    return updatedCliente;
  }

  static async delete(id: number): Promise<Cliente | null> {
    const deletedCliente = await prisma.cliente.delete({ where: { id } });
    if (!deletedCliente) return null;
    return deletedCliente;
  }
}
