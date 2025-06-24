import TabelaClientes from "@/components/tabelas/cliente/tabelaClientes";
import { Cliente } from "@/model/Cliente";

export default async function Clientes() {
  const clientes = await Cliente.findAll();
  return (
    <main>
      <TabelaClientes clientes={clientes} />
    </main>
  );
}
