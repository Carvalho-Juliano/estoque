import { Emprestimo } from "@/model/Emprestimo";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: number;
  };
}

export default async function DetalhesEmprestimo({ params }: Props) {
  const { id } = await params;
  if (!id) return notFound();
  const emprestimo = await Emprestimo.findById(id);
  if (!emprestimo) return <h2>Emprestimo não encontrado</h2>;

  return (
    <>
      <section>
        <h1>Detalhes do emprestimo do cliente: {emprestimo.clienteNome}</h1>
        <div>
          <p>Figurino emprestado: {emprestimo.figurinoDescricao}</p>
          <p>Quantidade: {emprestimo.quantidade} unidades</p>
          <p>Data do emprestimo: {emprestimo.createdAt.toDateString()}</p>
        </div>
      </section>
    </>
  );
}
