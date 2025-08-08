"use server";
import { revalidatePath } from "next/cache";

interface CostumeAttributeProps {
  description: string;
  quantity: number;
  size: string;
  available_quantity: number;
}

export async function ActionRegisterCostume(body: CostumeAttributeProps) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/figurino`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const erro = await res.json();
    return {
      success: false,
      errors: erro.errors ?? {},
      message: "Erro ao criar um novo figurino",
    };
  }

  return { success: true, message: "Figurino cadastrado com sucesso!" };
}

export async function ActionUpdateCostume(
  id: number,
  body: CostumeAttributeProps
) {
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
    const error = await res.json();
    return {
      success: false,
      errors: error.errors ?? {},
      message: "Erro ao atualizar figurino",
    };
  }

  return { success: true, message: "Figurino atualizado com sucesso!" };
}

export async function ActionDeleteCostume(id: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/figurino/${id}`,
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

    revalidatePath("/dashboard/figurino");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: { _global: ["Não foi possível conectara ao servidor."] },
    };
  }
}
