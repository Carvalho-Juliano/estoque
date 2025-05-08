import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function ActionCadastrarEmprestimo(
  formData: FormData
): Promise<void> {
  const idCliente = Number(formData.get("id_cliente"));
  const idFigurino = Number(formData.get("id_figurino"));
  const quantidade = Number(formData.get("quantidade"));

  const body = {
    idCliente,
    idFigurino,
    quantidade,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/emprestimo`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const erro = await res.json();
    console.log("Erro ao cadastrar emprestimo", erro);
    return;
  }

  redirect("/emprestimo");
}

export async function ActionExcluirEmprestimo(id: number): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/emprestimo/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    }
  );

  if (!res.ok) {
    const erro = await res.json();
    console.log("Erro ao excluir emprestimo", erro);
    return;
  }

  revalidatePath("/emprestimo");
}
