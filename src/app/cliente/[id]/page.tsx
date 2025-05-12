import { formatDate } from "@/components/dateFormat/dataFormatPt-Br";
import { Cliente } from "@/model/Cliente";
import { notFound } from "next/navigation";

export interface Props {
  params: {
    id: string;
  };
}

export default async function DetalhesCliente({ params }: Props) {
  const { id } = await params;
  const idNumber = Number(id);
  if (isNaN(idNumber)) return notFound;
  const cliente = await Cliente.getById(idNumber);
  if (!cliente) return <h2>Cliente não encontrado!</h2>;

  return (
    <main>
      <section className="container mt-5">
        <div className="card">
          <div className="card-header">
            <h2> Nome do cliente: {cliente.nome}</h2>
          </div>
          <div className="card-body fs-5">
            <p>
              <strong>ID:</strong> {cliente.id}
            </p>
            <p>
              <strong>Telefone:</strong> {cliente.telefone}
            </p>
            <p>
              <strong>Email:</strong> {cliente.email}
            </p>
            <p>
              <strong>Cliente cadastrado em:</strong>{" "}
              {formatDate(cliente.createdAt)}
            </p>
            <p>
              <strong>Cadastro atualizado em:</strong>{" "}
              {formatDate(cliente.updatedAt)}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
