import { formatDate } from "@/funcoes/dateFormat/dataFormatPt-Br";
import { Figurino } from "@/model/Figurino";
import Link from "next/link";

interface PropsDetalhesFigurino {
  figurino: Figurino;
}

export default function DetalhesFigurino({ figurino }: PropsDetalhesFigurino) {
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
              {formatDate(figurino.createdAt)}
            </p>
            <p>
              <strong>Atualizado pela ultima vez em: </strong>
              {formatDate(figurino.updatedAt)}
            </p>
          </div>
          <div className="container mb-3">
            <Link href={"/dashboard/figurino"} className="btn btn-secondary">
              Voltar
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
