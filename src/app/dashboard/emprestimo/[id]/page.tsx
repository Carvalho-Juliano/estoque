import DetalhesEmprestimo from "@/components/paginaVerDetalhes/emprestimo/detalhesEmprestimo";
import EmprestimoNaoEncontrado from "@/components/paginaVerDetalhes/emprestimo/emprestimoNaoEncontrado";
import { Emprestimo } from "@/model/Emprestimo";
import { notFound } from "next/navigation";

export default async function PaginaDetalhesEmprestimo(props: {
  params: { id: string };
}) {
  const { id } = await props.params;
  if (!id) return notFound();
  const emprestimo = await Emprestimo.findById(+id);
  //renderiza a página 404 se o emprestimo não for encontrado
  if (!emprestimo) return <EmprestimoNaoEncontrado />;

  //renderiza a página de detalhes do emprestimo
  return <DetalhesEmprestimo emprestimo={emprestimo} />;
}
