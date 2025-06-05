"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type FigurinoResponse =
  | { success: true }
  | { success: false; errors: Record<string, string> };

export async function ActionCadastrarFigurino(
  formData: FormData
): Promise<FigurinoResponse> {
  const descricao = String(formData.get("descricao"));
  const quantidade = Number(formData.get("quantidade"));
  const tamanho = String(formData.get("tamanho"));
  const disponivel = Number(formData.get("disponivel"));

  const body = {
    descricao,
    quantidade,
    tamanho,
    disponivel,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/figurino`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const erro = await res.json();
    console.log("Erro ao cadastrar figurino", erro);
    return { success: false, errors: erro.errors };
  }

  redirect("/figurino");
}

export async function ActionAtualizarFigurino(
  formData: FormData,
  id: number
): Promise<void> {
  const descricao = formData.get("descricao");
  const quantidade = Number(formData.get("quantidade"));
  const tamanho = formData.get("tamanho");
  const disponivel = Number(formData.get("disponivel"));

  const body = {
    descricao,
    quantidade,
    tamanho,
    disponivel,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/figurino/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const erro = await res.json();
    console.error("Erro ao atualizar figurino", erro);
    return;
  }

  redirect("/figurino");
}

export async function ExcluirFigurino(id: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/figurino/${id}`,
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
    console.error("Erro ao excluir figurino", erro);
    return;
  }

  revalidatePath("/figurino");
}
