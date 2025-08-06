import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FormRegisterClient } from "@/components/formularios/cliente/formCadastrarCliente";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RegisterClient() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");
  return (
    <>
      <h2 className="mb-3">Cadastrar novo cliente</h2>
      <FormRegisterClient />
    </>
  );
}
