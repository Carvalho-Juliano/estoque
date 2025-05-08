"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type EmprestimoResponse =
  | { success: true }
  | { success: false; errors: Record<string, string> };

export async function ActionCadastrarEmprestimo(
  formData: FormData
): Promise<EmprestimoResponse> {
  const clienteId = Number(formData.get("clienteId"));
  const figurinoId = Number(formData.get("figurinoId"));
  const quantidade = Number(formData.get("quantidade"));

  const body = {
    clienteId,
    figurinoId,
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
    return { success: false, errors: erro.errors };
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
