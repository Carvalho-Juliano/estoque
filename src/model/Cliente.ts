import prisma from "@/lib/prisma";

export interface ClientAttributes {
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

  constructor(attributes: ClientAttributes) {
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
    const cliente = await prisma.cliente.findUnique({ where: { id: +id } });
    if (!cliente) return null;
    return cliente;
  }

  //Metodo que conta o total de clientes registrados
  static async getClientesRegistrados() {
    const totalClientesRegistrados = await prisma.cliente.count();
    return totalClientesRegistrados;
  }

  static async createCliente(
    attributes: Omit<ClientAttributes, "id" | "createdAt" | "updatedAt">
  ): Promise<Cliente> {
    const { nome, email, telefone } = attributes;

    //bloco de código para verificar se o email já foi cadastrado no banco de dados
    if (email) {
      const emailExistente = await prisma.cliente.findUnique({
        where: { email },
      });
      if (emailExistente) {
        throw new Error("Email já cadastrado.");
      }
    }

    //bloco de código para verificar se o telefone já foi cadastrado no banco de dados
    const telefoneExistente = await prisma.cliente.findUnique({
      where: { telefone },
    });
    if (telefoneExistente) {
      throw new Error("Telefone já cadastrado.");
    }

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
      Omit<ClientAttributes, "id" | "createdAt" | "updatedAt">
    >
  ): Promise<Cliente | null> {
    const cliente = await prisma.cliente.findUnique({ where: { id: +id } });
    if (!cliente) return null;
    const updatedCliente = await prisma.cliente.update({
      where: { id: +id },
      data: {
        ...attributes,
        updatedAt: new Date(),
      },
    });
    return updatedCliente;
  }

  static async delete(id: number): Promise<Cliente | null> {
    const deletedCliente = await prisma.cliente.delete({ where: { id: +id } });
    if (!deletedCliente) return null;
    return deletedCliente;
  }
}
