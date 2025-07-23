import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TabelaEmprestimos from "@/components/tabelas/emprestimo/tabelaEmprestimos";
import { Emprestimo } from "@/model/Emprestimo";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Emprestimos() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");

  const emprestimos = await Emprestimo.findAll();

  return (
    <main>
      <TabelaEmprestimos emprestimos={emprestimos} />
    </main>
  );
}
