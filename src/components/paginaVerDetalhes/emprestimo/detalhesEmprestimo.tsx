import { formatDate } from "@/components/dateFormat/dataFormatPt-Br";
import { EmprestimoDetalhado } from "@/model/Emprestimo";

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
        </div>
      </section>
    </main>
  );
}
