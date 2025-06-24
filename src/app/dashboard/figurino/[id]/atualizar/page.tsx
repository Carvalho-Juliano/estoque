import { FormAtualizarFigurino } from "@/components/formularios/figurino/formAtualizarFigurino";
import FigurinoNaoEncontrado from "@/components/paginaVerDetalhes/figurino/figurinoNaoEncontrado";
import { Figurino } from "@/model/Figurino";
import { notFound } from "next/navigation";

export default async function AtualizarFigurino(props: {
  params: { id: string };
}) {
  const { id } = await props.params;
  if (!id) return notFound();
  const figurino = await Figurino.getById(+id);
  if (!figurino) return <FigurinoNaoEncontrado />;

  return (
    <main>
      <section className="container mb-5 mt-5">
        <h2 className="mb-3">Atualizar Figurino</h2>
        <FormAtualizarFigurino figurino={figurino} id={+id} />
      </section>
    </main>
  );
}
