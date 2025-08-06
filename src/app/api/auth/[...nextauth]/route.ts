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
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credenciais recebidas:", credentials);
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.usuario.findUnique({
          where: { email: credentials?.email },
        });
        console.log("Usuário encontrado:", user);
        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          console.log("Senha correta!"); //Remover *****
          return {
            id: String(user.id),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
          };
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt" as const, //por algum motivo o authOptions nao estava aceitando o strategy como tipo string*
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.phone = token.phone;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
