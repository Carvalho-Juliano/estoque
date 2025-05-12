import ClienteNaoEncontrado from "@/components/paginaVerDetalhes/cliente/clienteNaoEncontrado";
import DetalhesCliente from "@/components/paginaVerDetalhes/cliente/datalhesCliente";
import { Cliente } from "@/model/Cliente";
import { notFound } from "next/navigation";

export default async function PaginaDetalhesCliente(props: {
  params: { id: string };
}) {
  const { id } = await props.params;
  if (!id) return notFound();
  const cliente = await Cliente.getById(+id);
  //renderiza a página 404 se o cliente não for encontrado
  if (!cliente) return <ClienteNaoEncontrado />;

  //renderiza a página de detalhes do cliente
  return <DetalhesCliente cliente={cliente} />;
}
