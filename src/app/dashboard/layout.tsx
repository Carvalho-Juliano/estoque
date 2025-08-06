import Footer from "@/components/footer";
import WrappedHeader from "@/components/wrappedHeader";
import type { Metadata } from "next";

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
    <>
      <WrappedHeader />
      <div>{children}</div>
      <Footer />
    </>
  );
}
