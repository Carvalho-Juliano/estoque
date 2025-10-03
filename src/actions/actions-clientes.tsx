"use server";
import { revalidatePath } from "next/cache";

interface ClientAttributeProps {
  name: string;
  phone: string;
  email: string;
}

export async function ActionRegisterClient(body: ClientAttributeProps) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cliente`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const error = await res.json();
    return { success: false, errors: error.errors };
  }

  return { success: true };
}

export async function ActionUpdateClient(
  id: number,
  body: ClientAttributeProps
) {
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

  return { success: true };
}

export async function ActionRemoveClient(id: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/cliente/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        errors: data.errors || {
          _global: [data.message || "Erro desconhecido"],
        },
      };
    }

    revalidatePath("/dashboard/cliente");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: { _global: ["Não foi possível conectar ao servidor"] },
    };
  }
}
