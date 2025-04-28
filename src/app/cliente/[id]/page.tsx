import { Cliente } from "@/model/Cliente";

interface Props {
  params: {
    id: number;
  };
}

export default async function DetalhesCliente({ params }: Props) {
  const { id } = await params;
  const cliente = await Cliente.getById(id);
  if (!cliente) return <h2>Cliente não encontrado!</h2>;

  return (
    <>
      <h1>Nome do cliente: {cliente.nome}</h1>
      <div>
        <p>Id: {cliente.id}</p>
        <p>Telefone: {cliente.telefone}</p>
        <p>Email: {cliente.email}</p>
        <p>Cliente cadastrado em: {cliente.createdAt.toDateString()}</p>
        <p>Cadastro atualizado em: {cliente.updatedAt.toDateString()}</p>
      </div>
    </>
  );
}
