import { Emprestimo } from "@/model/Emprestimo";
import Link from "next/link";
import ButtonDeletarEmprestimo from "@/components/botoes/emprestimo/deleteEmprestimoButton";

export default async function TabelaEmprestimos() {
  const emprestimos = await Emprestimo.findAll();
  return (
    <section className="container mb-5 mt-5">
      <div className="container mb-3 d-flex justify-content-between align-items-center">
        <h2 className="mb-3">Todos os emprestimos</h2>
        <Link className="btn btn-secondary" href="/emprestimo/cadastrar">
          <i className="bi bi-plus"></i>Cadastrar novo emprestimo
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-secondary">
            <tr>
              <th>Id</th>
              <th>Nome do cliente</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {emprestimos.map((emprestimo) => (
              <tr key={emprestimo.id}>
                <td>{emprestimo.id}</td>
                <td>{emprestimo.clienteNome}</td>
                <td>
                  <Link
                    className="btn btn-primary"
                    href={`/emprestimo/${emprestimo.id}`}
                  >
                    Ver Detalhes
                  </Link>
                  <ButtonDeletarEmprestimo id={emprestimo.id} />
                </td>
                {/* <td>
                    <Link href={}>Atualizar</Link>
                  </td>*/}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
