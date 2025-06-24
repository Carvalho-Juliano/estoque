import TabelaEmprestimos from "@/components/tabelas/emprestimo/tabelaEmprestimos";
import { Emprestimo } from "@/model/Emprestimo";

export default async function Emprestimos() {
  const emprestimos = await Emprestimo.findAll();
  return (
    <main>
      <TabelaEmprestimos emprestimos={emprestimos} />
    </main>
  );
}
