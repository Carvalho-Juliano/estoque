import { Figurino } from "@/model/Figurino";
import Link from "next/link";
import { notFound } from "next/navigation";

export interface Props {
  params: {
    id: number;
  };
}

export default async function DetalhesFigurino({ params }: Props) {
  const { id } = await params;
  if (!id) return notFound;
  const figurino = await Figurino.getById(id);
  if (!figurino) {
    return (
      <main>
        <section className="container mt-5">
          <div className="card border-danger">
            <div className="card-header">
              <h2>Figurino não encontrado!</h2>
              <div className="card-body fs-5">
                <p>
                  O figurino requisitado nao foi encontrado no nosso banco de
                  dados.
                </p>
                <Link href={`/figurino`} className="btn btn-secondary">
                  <i className="bi bi-reply-fill"></i> Voltar
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="container mt-5">
        <div className="card">
          <div className="card-header">
            <h2>Figurino: {figurino.descricao}</h2>
          </div>
          <div className="card-body fs-5">
            <p>
              <strong>ID: </strong>
              {figurino.id}
            </p>
            <p>
              <strong>Descrição: </strong>
              {figurino.descricao}
            </p>
            <p>
              <strong>Tamanho: </strong>
              {figurino.tamanho}
            </p>
            <p>
              <strong>Quantidade total: </strong>
              {figurino.quantidade}
            </p>
            <p>
              <strong>Quantidade disponivel: </strong>
              {figurino.disponivel}
            </p>
            <p>
              <strong>Figurino cadastrado em: </strong>
              {figurino.createdAt.toDateString()}
            </p>
            <p>
              <strong>Atualizado pela ultima vez em: </strong>
              {figurino.updatedAt.toDateString()}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
