"use client";

import Header from "@/components/authHeader/header";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <main>
        <Header />
        {children}
        <footer className="bg-body-tertiary text-center py-3">
          <p>&copy; Feito por @JulianoCarvalho =D</p>
        </footer>
      </main>
    </SessionProvider>
  );
}
