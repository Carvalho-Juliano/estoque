import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { FormRegisterCostume } from "@/components/formularios/figurino/formCadastrarFigurino";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RegisterCostumePage() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");
  return (
    <>
      <FormRegisterCostume />
    </>
  );
}
