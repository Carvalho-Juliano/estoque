import { formatDate } from "@/utils/dateFormat/dataFormatPt-Br";
import { Costume } from "@/model/Figurino";
import Link from "next/link";

interface detailedCustomProps {
  costume: Costume;
}

export default function CostumeDetails({ costume }: detailedCustomProps) {
  return (
    <main>
      <section className="container mt-5">
        <div className="card">
          <div className="card-header">
            <h2>Figurino: {costume.description}</h2>
          </div>
          <div className="card-body fs-5">
            <p>
              <strong>ID: </strong>
              {costume.id}
            </p>
            <p>
              <strong>Descrição: </strong>
              {costume.description}
            </p>
            <p>
              <strong>Tamanho: </strong>
              {costume.size}
            </p>
            <p>
              <strong>Quantidade total: </strong>
              {costume.quantity}
            </p>
            <p>
              <strong>Quantidade disponivel: </strong>
              {costume.available_quantity}
            </p>
            <p>
              <strong>Figurino cadastrado em: </strong>
              {formatDate(costume.createdAt)}
            </p>
            <p>
              <strong>Atualizado pela ultima vez em: </strong>
              {formatDate(costume.updatedAt)}
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
