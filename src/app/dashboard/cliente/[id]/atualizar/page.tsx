import FormAtualizarCliente from "@/components/formularios/cliente/formAtualizarCliente";
import { Cliente } from "@/model/Cliente";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function AtualizarCliente({ params }: Props) {
  const { id } = await params;
  const idNumber = Number(id);
  if (isNaN(idNumber)) return notFound();

  const cliente = await Cliente.getById(idNumber);
  if (!cliente) return <h2>Cliente não encontrado</h2>;

  return (
    <main>
      <section className="container mb-5 mt-5">
        <h1 className="mb-3">Pagina para atualizar cliente</h1>
        <FormAtualizarCliente id={idNumber} cliente={cliente} />
      </section>
    </main>
  );
}
