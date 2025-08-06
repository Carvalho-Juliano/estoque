import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FormUpdateClient from "@/components/formularios/cliente/formAtualizarCliente";
import ClienteNaoEncontrado from "@/components/paginaVerDetalhes/cliente/clienteNaoEncontrado";
import { Client } from "@/model/Cliente";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function UpdateClientPage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");
  const { id } = await params;
  const idNumber = Number(id);
  if (isNaN(idNumber) || !idNumber) {
    return notFound();
  }

  const client = await Client.getById(idNumber);
  if (!client) return <ClienteNaoEncontrado />;

  return (
    <>
      <FormUpdateClient id={idNumber} client={client} />
    </>
  );
}
