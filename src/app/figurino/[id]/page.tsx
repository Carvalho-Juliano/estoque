import { Figurino } from "@/model/Figurino";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: number;
  };
}

export default async function DetalhesFigurino({ params }: Props) {
  const { id } = await params;
  const figurino = await Figurino.getById(id);
  if (!figurino) return <h2>Figurino não encontrado!</h2>;

  return (
    <>
      <h1>Figurino: {figurino.descricao}</h1>
      <div>
        <p>Id: {figurino.id}</p>
        <p>Descrição: {figurino.descricao}</p>
        <p>Quantidade total: {figurino.quantidade}</p>
        <p>Quantidade disponivel: {figurino.disponivel}</p>
        <p>Cadastrado em: {figurino.createdAt.toDateString()}</p>
        <p>
          Atualizado pela ultima vez em: {figurino.updatedAt.toDateString()}
        </p>
      </div>
    </>
  );
}
