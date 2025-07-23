import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Container } from "reactstrap";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) return redirect("/login");
  if (!session.user) return null;
  return (
    <>
      <Container>
        <h1>Profile</h1>
        <p>Email: {session.user.email}</p>
      </Container>
    </>
  );
}
