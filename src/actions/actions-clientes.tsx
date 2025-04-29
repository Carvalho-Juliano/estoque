"use server";

import { Cliente } from "@/model/Cliente";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function ActionCadastrarCliente(
  formData: FormData
): Promise<void> {
  const nome = formData.get("nome");
  const email = formData.get("email");
  const telefone = formData.get("telefone");

  if (
    typeof nome != "string" ||
    typeof email != "string" ||
    typeof telefone != "string"
  ) {
    return;
  }

  await Cliente.createCliente({ nome, email, telefone });
  redirect("/cliente");
}

export async function ActionAtualizarCliente(
  formData: FormData,
  id: number
): Promise<void> {
  const nome = formData.get("nome");
  const email = formData.get("email");
  const telefone = formData.get("telefone");

  if (
    typeof nome != "string" ||
    typeof email != "string" ||
    typeof telefone != "string"
  ) {
    return;
  }

  await Cliente.updateCliente(id, {
    nome,
    email,
    telefone,
  });
  redirect("/cliente");
}

export async function ExcluirCliente(id: number) {
  await Cliente.delete(id);
  revalidatePath("/cliente");
}
