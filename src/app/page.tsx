import { Emprestimo } from "@/model/Emprestimo";
import { Figurino } from "@/model/Figurino";
import styles from "./page.module.css";
import { Cliente } from "@/model/Cliente";

export default async function Home() {
  const emprestimos = await Emprestimo.findAll();
  const totalEmprestimos = await Emprestimo.getTotalEmprestimos();
  const totalFigurinos = await Figurino.getTotalFigurinos();
  const totalFigurinosRegistrados = await Figurino.getFigurinosRegistrados();
  const clientesRegistrados = await Cliente.getClientesRegistrados();
  //figurinosRecentementeCadastrados
  //totalEmprestimos
  //
  return (
    <>
      <h1>Bem vindo ao Sistema de controle de estoque</h1>

      <main>
        <h2>Informações sobre o estoque</h2>
        <div>
          <div>
            <span>Total de figurinos: {totalFigurinos}</span>
          </div>

          <div>
            <span>Variedade de figurinos: {totalFigurinosRegistrados}</span>
          </div>

          <div>
            <span>Item em emprestimo: {totalEmprestimos}</span>
          </div>

          <div>
            <span>total de clientes registrados: {clientesRegistrados}</span>
          </div>
        </div>

        <h3>Todos os emprestimos</h3>
        <table>
          <thead>
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
      </main>
    </>
  );
}
