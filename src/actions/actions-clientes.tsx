"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type ClientResponse =
  | { success: true }
  | { success: false; errors: Record<string, string> };

export async function ActionCadastrarCliente(
  formData: FormData
): Promise<ClientResponse> {
  const nome = formData.get("nome");
  const email = formData.get("email");
  const telefone = formData.get("telefone");

  const body = {
    nome,
    email,
    telefone,
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cliente`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const erro = await res.json();
    console.log("Erro ao cadastrar cliente", erro);
    return { success: false, errors: erro.errors };
  }

  return { success: true };
}

export async function ActionAtualizarCliente(
  formData: FormData,
  id: number
): Promise<ClientResponse> {
  const nome = formData.get("nome");
  const email = formData.get("email");
  const telefone = formData.get("telefone");

  const body = {
    nome,
    email,
    telefone,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cliente/${id}`,
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
    console.log("Erro ao atualizar cliente", erro);
    return { success: false, errors: erro.errors };
  }

  redirect("/dashboard/cliente");
}

export async function ActionExcluirCliente(id: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/cliente/${id}`,
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
    console.log("Erro ao excluir cliente", erro);
    return;
  }

  revalidatePath("/cliente");
}
