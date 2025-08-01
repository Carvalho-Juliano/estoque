import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Faça login para ter acesso ao Dashboard",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
