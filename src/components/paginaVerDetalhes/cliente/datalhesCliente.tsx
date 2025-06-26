import { formatDate } from "@/funcoes/dateFormat/dataFormatPt-Br";
import { Cliente } from "@/model/Cliente";
import Link from "next/link";

interface DetalhesClienteProps {
  cliente: Cliente;
}

export default function DetalhesCliente({ cliente }: DetalhesClienteProps) {
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
          <div className="container mb-3">
            <Link href={"/dashboard/cliente"} className="btn btn-secondary">
              Voltar
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
