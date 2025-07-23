import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import TabelaFigurinos from "@/components/tabelas/figurino/tabelaFigurinos";
import { Figurino } from "@/model/Figurino";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Figurinos() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");
  const figurinos = await Figurino.findAll();

  return (
    <main>
      <TabelaFigurinos figurinos={figurinos} />
    </main>
  );
}
