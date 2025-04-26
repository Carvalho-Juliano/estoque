import { Figurino } from "@/model/Figurino";
import Link from "next/link";

export default async function Figurinos() {
  const figurinos = await Figurino.findAll();
  return (
    <main>
      <section className="container mb-5 mt-5">
        <h2 className="mb-3">Todos figurinos cadastrados</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-secondary">
              <tr>
                <th>Id</th>
                <th>Descrição</th>
                <th>Quantiade</th>
                <th>Opçoes</th>
              </tr>
            </thead>
            <tbody>
              {figurinos.map((figurino) => (
                <tr key={figurino.id}>
                  <td>{figurino.id}</td>
                  <td>{figurino.descricao}</td>
                  <td>{figurino.quantidade}</td>
                  <td>
                    <Link
                      className="btn btn-primary"
                      href={`/figurino/${figurino.id}`}
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
    </main>
  );
}
