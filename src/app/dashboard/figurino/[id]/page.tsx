import DetalhesFigurino from "@/components/paginaVerDetalhes/figurino/detalhesFigurino";
import FigurinoNaoEncontrado from "@/components/paginaVerDetalhes/figurino/figurinoNaoEncontrado";
import { Figurino } from "@/model/Figurino";
import { notFound } from "next/navigation";

export default async function PaginaDetalhesFigurino(props: {
  params: { id: string };
}) {
  const { id } = await props.params;
  if (!id) return notFound();
  const figurino = await Figurino.getById(+id);
  //renderiza a página 404 se o figurino não for encontrado
  if (!figurino) return <FigurinoNaoEncontrado />;

  //renderiza a página de detalhes do figurino
  return <DetalhesFigurino figurino={figurino} />;
}
