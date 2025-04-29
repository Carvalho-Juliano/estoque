import { Cliente } from "@/model/Cliente";
import Link from "next/link";

export default async function TabelaClientes() {
  const clientes = await Cliente.findAll();
  return (
    <section className="container mb-5 mt-5">
      <div className="container mb-3 d-flex justify-content-between align-items-center">
        <h2>Todos os clientes cadastrados</h2>
        <Link className="btn btn-secondary" href="/cliente/cadastrar">
          <i className="bi bi-plus"></i>Cadastrar novo cliente
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-secondary">
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.telefone}</td>
                <td>
                  <Link
                    className="btn btn-primary"
                    href={`/cliente/${cliente.id}`}
                  >
                    Ver detalhes
                  </Link>
                  <Link
                    className="btn btn-secondary ms-2"
                    href={`/cliente/${cliente.id}/atualizar`}
                  >
                    Atualizar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
