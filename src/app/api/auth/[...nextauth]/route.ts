import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credenciais recebidas:", credentials);
        if (!credentials?.email || !credentials?.senha) return null;
        const user = await prisma.usuario.findUnique({
          where: { email: credentials?.email },
        });
        console.log("Usuário encontrado:", user);
        if (user && (await bcrypt.compare(credentials.senha, user.senha))) {
          console.log("Senha correta!");
          return { id: String(user.id), email: user.email };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
