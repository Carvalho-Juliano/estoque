import { Figurino } from "@/model/Figurino";
import Link from "next/link";
import ButtonDeletarFigurino from "@/components/botoes/figurino/deleteFigurinoButton";

export default async function TabelaFigurinos() {
  const figurinos = await Figurino.findAll();
  return (
    <section className="container mb-5 mt-5">
      <div className="container mb-3 d-flex justify-content-between align-items-center">
        <h2>Todos figurinos cadastrados</h2>
        <Link className="btn btn-secondary" href="/figurino/cadastrar">
          <i className="bi bi-plus"></i>Cadastrar novo figurino
        </Link>
      </div>
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
                  <Link
                    className="btn btn-secondary ms-2"
                    href={`/figurino/${figurino.id}/atualizar`}
                  >
                    Atualizar
                  </Link>
                  <ButtonDeletarFigurino id={figurino.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
