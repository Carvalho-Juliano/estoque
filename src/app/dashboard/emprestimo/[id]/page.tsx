import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoanDetails from "@/components/paginaVerDetalhes/emprestimo/detalhesEmprestimo";
import EmprestimoNaoEncontrado from "@/components/paginaVerDetalhes/emprestimo/emprestimoNaoEncontrado";
import { Emprestimo } from "@/model/Emprestimo";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export default async function PageDetailedLoan(props: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");
  const { id } = await props.params;
  const idNumber = Number(id);
  if (isNaN(idNumber) || !idNumber) {
    return notFound();
  }
  const emprestimo = await Emprestimo.findById(+id);
  if (!emprestimo) return <EmprestimoNaoEncontrado />;

  return (
    <>
      <LoanDetails emprestimo={emprestimo} />;
    </>
  );
}
