import TabelaClientes from "@/components/tabelas/cliente/tabelaClientes";

export default async function Clientes() {
  return (
    <main>
      <TabelaClientes />
      {/* tabela com a logica para exibir todos os clientes
      cadastrados no banco de dados. */}
    </main>
  );
}
