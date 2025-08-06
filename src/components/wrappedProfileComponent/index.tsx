"use client";
import { SessionProvider } from "next-auth/react";
import ProfilePageComponent from "../profile/profilePage";

export default function WrappedProfilePage() {
  return (
    <>
      <SessionProvider>
        <ProfilePageComponent />
      </SessionProvider>
    </>
  );
}
