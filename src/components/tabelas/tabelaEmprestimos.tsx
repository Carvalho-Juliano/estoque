import { Emprestimo } from "@/model/Emprestimo";
import Link from "next/link";

export default async function TabelaEmprestimos() {
  const emprestimos = await Emprestimo.findAll();
  return (
    <section className="container mb-5 mt-5">
      <h2 className="mb-3">Todos os emprestimos</h2>
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
                </td>
                {/* <td>
                    <Link href={}>Atualizar</Link>
                  </td>
                  <td>
                    <Link href={}>Excluir</Link>
                  </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
