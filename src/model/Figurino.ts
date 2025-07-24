import prisma from "@/lib/prisma";

export interface CostumeAttributes {
  id: number;
  description: string;
  quantity: number;
  size: string;
  available_quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export class Costume {
  id: number;
  description: string;
  quantity: number;
  size: string;
  available_quantity: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(attributes: CostumeAttributes) {
    this.id = attributes.id;
    this.description = attributes.description;
    this.quantity = attributes.quantity;
    this.size = attributes.size;
    this.available_quantity = attributes.available_quantity;
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
  }

  static async findAll() {
    return await prisma.figurino.findMany();
  }

  static async getById(id: number): Promise<Costume | null> {
    const costume = await prisma.figurino.findUnique({ where: { id: +id } });
    if (!costume) return null;
    return costume;
  }

  //Quantidade total de items em estoque
  static async getTotalQuantity() {
    const result = await prisma.figurino.aggregate({
      _sum: {
        available_quantity: true,
      },
    });

    return result._sum.available_quantity || 0;
  }

  //Metodo que conta o total de figurinos registrados.
  static async getRegisteredCostumes() {
    const totalRegisteredCostumes = await prisma.figurino.count();
    return totalRegisteredCostumes;
  }

  static async createCostume(
    attributes: Omit<CostumeAttributes, "id" | "createdAt" | "updatedAt">
  ): Promise<Costume> {
    const { description, quantity, size, available_quantity } = attributes;
    const newFigurino = await prisma.figurino.create({
      data: {
        description,
        quantity,
        size,
        available_quantity,
      },
    });
    return newFigurino;
  }

  static async updateCostume(
    id: number,
    attributes: Partial<
      Omit<CostumeAttributes, "id" | "createdAt" | "updatedAt">
    >
  ): Promise<Costume | null> {
    const costume = await prisma.figurino.findUnique({ where: { id: +id } });
    if (!costume) return null;
    const updatedCostume = await prisma.figurino.update({
      where: { id: +id },
      data: {
        ...attributes,
        updatedAt: new Date(),
      },
    });
    return updatedCostume;
  }

  static async verifyRelatedCustomLoan(id: number) {
    const relatedLoan = await prisma.emprestimo.findFirst({
      where: {
        figurinoId: id,
      },
    });
    if (!relatedLoan) return null;
    return relatedLoan;
  }

  static async deleteCostume(id: number): Promise<Costume | null> {
    const deletedCostume = await prisma.figurino.delete({
      where: { id: +id },
    });

    if (!deletedCostume) return null;
    return deletedCostume;
  }
}
