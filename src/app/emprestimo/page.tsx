import { Emprestimo } from "@/model/Emprestimo";
import Link from "next/link";

export default async function Emprestimos() {
  const emprestimos = await Emprestimo.findAll();

  return (
    <>
      <h1>emprestimos</h1>

      <section>
        <h2>Todos os emprestimos</h2>

        <div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome do cliente</th>
              </tr>
            </thead>
            <tbody>
              {emprestimos.map((emprestimo) => (
                <tr key={emprestimo.id}>
                  <td>{emprestimo.id}</td>
                  <td>{emprestimo.clienteNome}</td>
                  <td>
                    <Link href={`/emprestimo/${emprestimo.id}`}>
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
    </>
  );
}
