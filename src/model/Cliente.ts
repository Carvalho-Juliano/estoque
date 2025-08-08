import prisma from "@/lib/prisma";

export interface ClientAttributes {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(attributes: ClientAttributes) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.email = attributes.email;
    this.phone = attributes.phone;
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
  }

  static async findAll() {
    return await prisma.cliente.findMany();
  }

  static async getById(id: number): Promise<Client | null> {
    const client = await prisma.cliente.findUnique({ where: { id: +id } });
    if (!client) return null;
    return client;
  }

  static async getAllRegisteredClients() {
    const totalRegisteredClients = await prisma.cliente.count();
    return totalRegisteredClients;
  }

  static async registerClient(
    attributes: Omit<ClientAttributes, "id" | "createdAt" | "updatedAt">
  ): Promise<Client> {
    const { name, email, phone } = attributes;

    const existingEmail = await prisma.cliente.findUnique({
      where: {
        email: email,
      },
    });
    if (existingEmail) {
      throw new Error("Email já cadastrado.");
    }

    const existingPhone = await prisma.cliente.findUnique({
      where: { phone: phone },
    });
    if (existingPhone) {
      throw new Error("Telefone já cadastrado.");
    }

    const newCliente = await prisma.cliente.create({
      data: {
        name,
        email,
        phone,
      },
    });
    return newCliente;
  }

  static async updateClient(
    id: number,
    attributes: Partial<
      Omit<ClientAttributes, "id" | "createdAt" | "updatedAt">
    >
  ): Promise<Client | null> {
    const client = await prisma.cliente.findUnique({ where: { id: +id } });
    if (!client) return null;
    const updatedCliente = await prisma.cliente.update({
      where: { id: +id },
      data: {
        name: attributes.name,
        email: attributes.email,
        phone: attributes.phone,
        updatedAt: new Date(),
      },
    });
    return updatedCliente;
  }

  static async verifyRelatedClientLoan(id: number) {
    const relatedLoan = await prisma.emprestimo.findFirst({
      where: {
        clientId: id,
      },
    });
    if (relatedLoan)
      throw new Error(
        "Este cliente tem um emprestimo pendente, resolva esta pendência antes de tenter exclui-lo"
      );
    return true;
  }

  static async delete(id: number): Promise<Client | null> {
    const deletedClient = await prisma.cliente.delete({ where: { id: +id } });
    if (!deletedClient) return null;
    return deletedClient;
  }
}
