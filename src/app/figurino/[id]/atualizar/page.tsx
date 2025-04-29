import FormAtualizarFigurino from "@/components/formularios/figurino/formAtualizarFigurino";
import { Figurino } from "@/model/Figurino";
import { notFound } from "next/navigation";
import { Props } from "../page";

export default async function AtualizarFigurino({ params }: Props) {
  const { id } = await params;
  if (isNaN(id)) return notFound();
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
