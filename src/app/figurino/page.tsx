import { Figurino } from "@/model/Figurino";
import Link from "next/link";

export default async function Figurinos() {
  const figurinos = await Figurino.findAll();
  return (
    <>
      <h1>Figurinos</h1>
      <section>
        <h2>Todos figurinos cadastrados</h2>
        <div>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Descrição</th>
                <th>Quantiade</th>
              </tr>
            </thead>
            <tbody>
              {figurinos.map((figurino) => (
                <tr key={figurino.id}>
                  <td>{figurino.id}</td>
                  <td>{figurino.descricao}</td>
                  <td>{figurino.quantidade}</td>
                  <td>
                    <Link href={`/figurino/${figurino.id}`}>Ver detalhes</Link>
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
