import { Emprestimo } from "@/model/Emprestimo";
import { Figurino } from "@/model/Figurino";
import { Cliente } from "@/model/Cliente";
import RequireAuth from "@/components/requireAuth/requireAuth";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");

  const emprestimos = await Emprestimo.findAll();
  const totalEmprestimos = await Emprestimo.getTotalEmprestimos();
  const totalFigurinos = await Figurino.getTotalFigurinos();
  const totalFigurinosRegistrados = await Figurino.getFigurinosRegistrados();
  const clientesRegistrados = await Cliente.getClientesRegistrados();

  return (
    <RequireAuth>
      <main className="container mt-5">
        <h1 className="mb-4">Sistema de Controle de Estoque</h1>
        <section className="mb-5">
          <h2 className="mb-3">📊 Informações sobre o estoque</h2>
          <div className="row">
            <div className="col-md-3 mb-3">
              <div className="card text-bg-secondary">
                <div className="card-body">
                  <h5 className="card-title">Total de Figurinos</h5>
                  <p className="card-text fs-4">{totalFigurinos}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card text-bg-secondary">
                <div className="card-body">
                  <h5 className="card-title">Variedades</h5>
                  <p className="card-text fs-4">{totalFigurinosRegistrados}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card text-bg-secondary">
                <div className="card-body">
                  <h5 className="card-title">Em Empréstimo</h5>
                  <p className="card-text fs-4">{totalEmprestimos}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card text-bg-secondary">
                <div className="card-body">
                  <h5 className="card-title">Clientes Registrados</h5>
                  <p className="card-text fs-4">{clientesRegistrados}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="mb-3">📋 Todos os emprestimos</h3>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-secondary">
                <tr>
                  <th>Id</th>
                  <th>Cliente</th>
                  <th>Figurino</th>
                  <th>Quantidade</th>
                </tr>
              </thead>
              <tbody>
                {emprestimos.map((emprestimo) => (
                  <tr key={emprestimo.id}>
                    <td>{emprestimo.id}</td>
                    <td>{emprestimo.clienteNome}</td>
                    <td>{emprestimo.figurinoDescricao}</td>
                    <td>{emprestimo.quantidade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </RequireAuth>
  );
}
