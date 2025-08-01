import CostumeDetails from "@/components/paginaVerDetalhes/figurino/detalhesFigurino";
import FigurinoNaoEncontrado from "@/components/paginaVerDetalhes/figurino/figurinoNaoEncontrado";
import { Costume } from "@/model/Figurino";
import { notFound } from "next/navigation";

export default async function PaginaDetalhesFigurino(props: {
  params: { id: string };
}) {
  const { id } = await props.params;
  const idNumber = Number(id);
  if (isNaN(idNumber) || !idNumber) {
    return notFound();
  }
  const costume = await Costume.getById(idNumber);
  if (!costume) return <FigurinoNaoEncontrado />;

  return <CostumeDetails costume={costume} />;
}
