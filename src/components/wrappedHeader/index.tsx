"use client";

import { SessionProvider } from "next-auth/react";
import Header from "../authHeader";

export default function WrappedHeader() {
  return (
    <>
      <SessionProvider>
        <Header />
      </SessionProvider>
    </>
  );
}
