import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CostumesTable from "@/components/tables/costumeTables";
import { Costume } from "@/model/Figurino";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CostumesPage() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");
  const costumes = await Costume.findAll();

  return (
    <>
      <CostumesTable costumes={costumes} />
    </>
  );
}
