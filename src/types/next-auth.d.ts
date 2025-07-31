import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: number | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      phone?: string | null;
    };
  }
  interface User {
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
  }
}
