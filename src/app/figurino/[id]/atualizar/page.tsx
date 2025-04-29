import FormAtualizarFigurino from "@/components/formularios/figurino/atualizarFigurino";
import { Figurino } from "@/model/Figurino";
import { notFound } from "next/navigation";

export default async function AtualizarFigurino({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  if (!id) return notFound();
  const figurino = await Figurino.getById(id);
  if (!figurino) return <h2>Figurino não encontrado!</h2>;

  return (
    <main>
      <section className="container mb-5 mt-5">
        <h2 className="mb-3">Atualizar Figurino</h2>
        <FormAtualizarFigurino figurino={figurino} id={id} />
      </section>
    </main>
  );
}
