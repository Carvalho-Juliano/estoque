import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FormRegisterLoan } from "@/components/formularios/emprestimo/formCadastrarEmprestimo";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RegisterLoanPage() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");
  return (
    <>
      <FormRegisterLoan />
    </>
  );
}
