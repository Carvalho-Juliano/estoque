import { UpdateCostumeForm } from "@/components/formularios/figurino/formAtualizarFigurino";
import FigurinoNaoEncontrado from "@/components/paginaVerDetalhes/figurino/figurinoNaoEncontrado";
import { Costume } from "@/model/Figurino";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function AtualizarFigurino({ params }: Props) {
  const { id } = await params;
  const idNumber = Number(id);
  if (isNaN(idNumber) || !idNumber) {
    return notFound();
  }
  const costume = await Costume.getById(idNumber);
  if (!costume) return <FigurinoNaoEncontrado />;

  return (
    <main>
      <section className="container mb-5 mt-5">
        <h2 className="mb-3">Atualizar Figurino</h2>
        <UpdateCostumeForm costume={costume} id={idNumber} />
      </section>
    </main>
  );
}
