import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface updateUserWithoutPassword {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface updateUserPassword {
  currentPassword: string;
  newPassword: string;
}

export class User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(attributes: UserAttributes) {
    this.id = attributes.id;
    this.firstName = attributes.firstName;
    this.lastName = attributes.lastName;
    this.email = attributes.email;
    this.phone = attributes.phone;
    this.password = attributes.password;
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
  }

  static async findAll() {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!usuarios) return null;
    return usuarios;
  }

  static async getById(id: number): Promise<User | null> {
    const usuario = await prisma.usuario.findUnique({
      where: { id: +id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!usuario) return null;
    return usuario;
  }

  static async create(
    attributes: Omit<UserAttributes, "id" | "createdAt" | "updatedAt">
  ): Promise<User> {
    const { email, password, firstName, lastName, phone } = attributes;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const existingEmail = await prisma.usuario.findUnique({
      where: { email },
    });

    if (existingEmail) {
      throw new Error("Email já cadastrado.");
    }

    const newUser = await prisma.usuario.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: encryptedPassword,
      },
    });

    return newUser;
  }

  static async updateUserWithoutPassword(
    id: number,
    attributes: Omit<
      updateUserWithoutPassword,
      "id" | "createdAt" | "updatedAt"
    >
  ): Promise<User | null> {
    const user = await prisma.usuario.findUnique({ where: { id: id } });
    if (!user) return null;
    const updatedUser = await prisma.usuario.update({
      where: { id: id },
      data: {
        firstName: attributes.firstName,
        lastName: attributes.lastName,
        email: attributes.email,
        phone: attributes.phone,
        updatedAt: new Date(),
      },
    });
    return updatedUser;
  }

  static async updateUserPassword(
    id: number,
    currentPassword: string,
    newPassword: string
  ): Promise<User | null> {
    const user = await prisma.usuario.findUnique({ where: { id: id } });
    if (!user || !user.password) return null;
    const rightPassword = await bcrypt.compare(currentPassword, user.password);
    if (!rightPassword) throw new Error("Senha atual incorreta");
    if (currentPassword === newPassword)
      throw new Error("As senhas devem ser diferenets");

    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    const updatedPassword = await prisma.usuario.update({
      where: { id: id },
      data: {
        password: encryptedPassword,
        updatedAt: new Date(),
      },
    });

    return updatedPassword;
  }

  static async delete(id: number): Promise<User | null> {
    const deletedUser = await prisma.usuario.delete({ where: { id: +id } });
    if (!deletedUser) return null;
    return deletedUser;
  }

  static async getByEmail(email: string): Promise<User | null> {
    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user) return null;
    return user;
  }
}
