import type { Metadata } from "next";
import ClientLayout from "./client-layout";

export const metadata: Metadata = {
  title: "Dashboard do estoque",
  description:
    "Página onde as informações sobre o estoque ficaram disponivéis para o Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <ClientLayout>{children}</ClientLayout>
    </main>
  );
}
