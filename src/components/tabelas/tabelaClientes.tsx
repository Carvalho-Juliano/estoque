import { Cliente } from "@/model/Cliente";
import Link from "next/link";

export default async function TabelaClientes() {
  const clientes = await Cliente.findAll();
  return (
    <>
      <section className="container mb-5 mt-5">
        <h2 className="mb-3">Todos os clientes cadastrados</h2>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
