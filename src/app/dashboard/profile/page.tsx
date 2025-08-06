import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import WrappedProfilePage from "@/components/wrappedProfileComponent";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");

  return (
    <>
      <WrappedProfilePage />
    </>
  );
}
