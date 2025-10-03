import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoansTable from "@/components/tables/loanTables";
import { Emprestimo } from "@/model/Emprestimo";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoansPage() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");
  const loans = await Emprestimo.findAll();

  return (
    <>
      <LoansTable loans={loans} />
    </>
  );
}
