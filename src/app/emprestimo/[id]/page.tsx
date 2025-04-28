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
    <main>
      <section className="container mt-3">
        <div className="card">
          <div className="card-header">
            <h2>Detalhes do emprestimo do cliente: {emprestimo.clienteNome}</h2>
          </div>
          <div className="card-body fs-5">
            <p>
              <strong>Figurino emprestado: </strong>{" "}
              {emprestimo.figurinoDescricao}
            </p>
            <p>
              <strong>Quantidade: </strong> {emprestimo.quantidade} unidades
            </p>
            <p>
              <strong>Data do emprestimo: </strong>{" "}
              {emprestimo.createdAt.toDateString()}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
