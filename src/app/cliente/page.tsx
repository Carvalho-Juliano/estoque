import { Cliente } from "@/model/Cliente";
import Link from "next/link";

export default async function Clientes() {
  const clientes = await Cliente.findAll();
  return (
    <>
      <h1>Clientes</h1>
      <section>
        <h2>Todos os clientes cadastrados</h2>
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Telefone</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.telefone}</td>
                  <td>
                    <Link href={`/cliente/${cliente.id}`}>Ver detalhes</Link>
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
