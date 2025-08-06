import ClienteNaoEncontrado from "@/components/paginaVerDetalhes/cliente/clienteNaoEncontrado";
import DetalhesCliente from "@/components/paginaVerDetalhes/cliente/datalhesCliente";
import { Client } from "@/model/Cliente";
import { notFound } from "next/navigation";

export default async function PaginaDetalhesCliente(props: {
  params: { id: string };
}) {
  const { id } = await props.params;
  if (!id) return notFound();
  const client = await Client.getById(+id);
  //renderiza a página 404 se o cliente não for encontrado
  if (!client) return <ClienteNaoEncontrado />;

  return <DetalhesCliente client={client} />;
}
