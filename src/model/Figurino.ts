import prisma from "@/lib/prisma";

interface AtributosFigurino {
  id: number;
  descricao: string;
  quantidade: number;
  tamanho: string;
  disponivel: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Figurino {
  id: number;
  descricao: string;
  quantidade: number;
  tamanho: string;
  disponivel: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(attributes: AtributosFigurino) {
    this.id = attributes.id;
    this.descricao = attributes.descricao;
    this.quantidade = attributes.quantidade;
    this.tamanho = attributes.tamanho;
    this.disponivel = attributes.disponivel;
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
  }

  static async findAll() {
    return await prisma.figurino.findMany();
  }

  static async getById(id: number): Promise<Figurino | null> {
    const figurino = await prisma.figurino.findUnique({ where: { id: +id } });
    if (!figurino) return null;
    return figurino;
  }

  static async createFigurino(
    attributes: Omit<AtributosFigurino, "id" | "createdAt" | "updatedAt">
  ): Promise<Figurino> {
    const { descricao, quantidade, tamanho, disponivel } = attributes;
    const newFigurino = await prisma.figurino.create({
      data: {
        descricao,
        quantidade,
        tamanho,
        disponivel,
      },
    });
    return newFigurino;
  }

  static async updateFigurino(
    id: number,
    attributes: Partial<
      Omit<AtributosFigurino, "id" | "createdAt" | "updatedAt">
    >
  ): Promise<Figurino | null> {
    const figurino = await prisma.figurino.findUnique({ where: { id: +id } });
    if (!figurino) return null;
    const updatedFigurino = await prisma.figurino.update({
      where: { id: +id },
      data: {
        ...attributes,
        updatedAt: new Date(),
      },
    });
    return updatedFigurino;
  }

  static async delete(id: number): Promise<Figurino | null> {
    const figurinoDeletado = await prisma.figurino.delete({
      where: { id: +id },
    });
    if (!figurinoDeletado) return null;
    return figurinoDeletado;
  }
}
