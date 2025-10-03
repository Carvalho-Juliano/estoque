import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { UpdateCostumeForm } from "@/components/formularios/figurino/formAtualizarFigurino";
import FigurinoNaoEncontrado from "@/components/details/costumeDetails/figurinoNaoEncontrado";
import { Costume } from "@/model/Figurino";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function UpdateCostumePage({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");
  const { id } = await params;
  const idNumber = Number(id);
  if (isNaN(idNumber) || !idNumber) {
    return notFound();
  }
  const costume = await Costume.getById(idNumber);
  if (!costume) return <FigurinoNaoEncontrado />;

  return (
    <>
      <UpdateCostumeForm costume={costume} id={idNumber} />
    </>
  );
}
