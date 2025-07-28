"use server";
import { sendCostumeData } from "@/utils/actionFormData/costumeFormdata";
import { revalidatePath } from "next/cache";

export async function ActionRegisterCostume(formData: FormData) {
  const res = await sendCostumeData(
    "POST",
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/figurino`,
    formData
  );

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

export async function ActionUpdateCostume(formData: FormData, id: number) {
  const res = await sendCostumeData(
    "PUT",
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/figurino/${id}`,
    formData
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

export async function deleteCostume(id: number) {
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
    const error = await res.json();
    console.error("Erro ao excluir figurino", error);
    return {
      success: false,
      errors: error.errors ?? {},
      message: "Erro ao excluir figurino",
    };
  }

  revalidatePath("/dashboard/figurino");
}
