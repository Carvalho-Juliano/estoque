import prisma from "@/lib/prisma";

interface AtributosUsuario {
  id: number;
  email: string;
  senha: string;
  createdAt: Date;
}

export class Usuario {
  id: number;
  email: string;
  senha?: string;
  createdAt: Date;

  constructor(attributes: AtributosUsuario) {
    this.id = attributes.id;
    this.email = attributes.email;
    this.senha = attributes.senha;
    this.createdAt = attributes.createdAt;
  }

  static async findAll() {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });
    return usuarios;
  }

  static async getById(id: number): Promise<Usuario | null> {
    const usuario = await prisma.usuario.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        createdAt: true,
      },
    });
    if (!usuario) return null;
    return usuario;
  }

  static async create(
    attributes: Omit<AtributosUsuario, "id" | "createdAt">
  ): Promise<Usuario> {
    const { email, senha } = attributes;
    const newUser = await prisma.usuario.create({
      data: {
        email,
        senha,
      },
    });
    return newUser;
  }

  static async delete(id: number): Promise<Usuario | null> {
    const usuarioDeletado = await prisma.usuario.delete({ where: { id } });
    if (usuarioDeletado) return null;
    return usuarioDeletado;
  }
}
