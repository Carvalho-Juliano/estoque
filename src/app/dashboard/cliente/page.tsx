import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ClientTable from "@/components/tabelas/cliente/tabelaClientes";
import { Client } from "@/model/Cliente";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ClientsPage() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");
  const listedClients = await Client.findAll();

  return (
    <>
      <ClientTable clients={listedClients} />
    </>
  );
}
