import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ClienteNaoEncontrado from "@/components/details/clientDetails/clienteNaoEncontrado";
import ClientDetails from "@/components/details/clientDetails";
import { Client } from "@/model/Cliente";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";

export default async function PageClientDetails(props: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");
  const { id } = await props.params;
  const idNumber = Number(id);
  if (isNaN(idNumber) || !idNumber) {
    return notFound();
  }
  const client = await Client.getById(idNumber);
  if (!client) return <ClienteNaoEncontrado />;

  return (
    <>
      <ClientDetails client={client} />;
    </>
  );
}
