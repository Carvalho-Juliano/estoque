import { Emprestimo } from "@/model/Emprestimo";
import { Costume } from "@/model/Figurino";
import { Client } from "@/model/Cliente";
import RequireAuth from "@/components/requireAuth/requireAuth";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LoansTable from "@/components/tabelas/emprestimo/tabelaEmprestimos";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");

  const loans = await Emprestimo.findAll();
  const totalQuantityOfLoans = await Emprestimo.getTotalLoanQuantity();
  const totalCostumes = await Costume.getTotalQuantity();
  const totalRegisteredCostumes = await Costume.getRegisteredCostumes();
  const registeredClients = await Client.getAllRegisteredClients();

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
                  <p className="card-text fs-4">{totalCostumes}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card text-bg-secondary">
                <div className="card-body">
                  <h5 className="card-title">Variedades</h5>
                  <p className="card-text fs-4">{totalRegisteredCostumes}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card text-bg-secondary">
                <div className="card-body">
                  <h5 className="card-title">Empréstimos em andamento</h5>
                  <p className="card-text fs-4">{totalQuantityOfLoans}</p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="card text-bg-secondary">
                <div className="card-body">
                  <h5 className="card-title">Clientes Registrados</h5>
                  <p className="card-text fs-4">{registeredClients}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h3 className="mb-3">📋 Todos os emprestimos</h3>
          <LoansTable loans={loans} />
        </section>
      </main>
    </RequireAuth>
  );
}
