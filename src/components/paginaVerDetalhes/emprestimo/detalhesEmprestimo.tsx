import { formatDate } from "@/funcoes/dateFormat/dataFormatPt-Br";
import { EmprestimoDetalhado } from "@/model/Emprestimo";
import Link from "next/link";

interface PropsDetalhesEmprestimo {
  emprestimo: EmprestimoDetalhado;
}

export default function DetalhesEmprestimo({
  emprestimo,
}: PropsDetalhesEmprestimo) {
  return (
    <main>
      <section className="container mt-5">
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
              <strong>Data do emprestimo: </strong>
              {formatDate(emprestimo.createdAt)}
            </p>
          </div>
          <div className="container mb-3">
            <Link href={"/dashboard/emprestimo"} className="btn btn-secondary">
              Voltar
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
