"use server";

import { revalidatePath } from "next/cache";
interface LoansAttributesBody {
  clientId: number;
  costumeId: number;
  quantity: number;
}

export async function ActionRegisterLoan(body: LoansAttributesBody) {
  try {
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
    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        errors: data.errors || {
          _global: [data.message || "Erro desconhecido"],
        },
      };
    }

    return { success: true, message: data.message };
  } catch (error) {
    return {
      success: false,
      errors: { _global: ["Não foi possível conectara ao servidor."] },
    };
  }
}

export async function ActionRemoveLoan(id: number) {
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
    const error = await res.json();
    return {
      success: false,
      errors: error.errors,
      message: "Erro ao excluir Emprestimo",
    };
  }

  revalidatePath("/dashboard/emprestimo");
}
