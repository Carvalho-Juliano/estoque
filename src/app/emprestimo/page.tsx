import TabelaEmprestimos from "@/components/tabelas/tabelaEmprestimos";
import { Emprestimo } from "@/model/Emprestimo";

export default async function Emprestimos() {
  return (
    <main>
      <TabelaEmprestimos />
    </main>
  );
}
