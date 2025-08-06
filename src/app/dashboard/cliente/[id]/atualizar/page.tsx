import FormAtualizarCliente from "@/components/formularios/cliente/formAtualizarCliente";
import ClienteNaoEncontrado from "@/components/paginaVerDetalhes/cliente/clienteNaoEncontrado";
import { Client } from "@/model/Cliente";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function AtualizarCliente({ params }: Props) {
  const { id } = await params;
  const idNumber = Number(id);
  if (isNaN(idNumber) || !idNumber) return notFound();

  const client = await Client.getById(idNumber);
  if (!client) return <ClienteNaoEncontrado />;

  return (
    <main>
      <section className="container mb-5 mt-5">
        <h2 style={{ color: "#03c04a" }}>Pagina para atualizar cliente</h2>
        <FormAtualizarCliente id={idNumber} client={client} />
      </section>
    </main>
  );
}
