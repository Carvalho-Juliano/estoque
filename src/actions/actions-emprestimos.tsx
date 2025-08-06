"use server";

import { createRequestSchemaEmprestimo } from "@/schemas/emprestimo/emprestimoSchema";
import { revalidatePath } from "next/cache";

type EmprestimoResponse =
  | { success: true; message: string }
  | { success: false; errors: Record<string, string[]> };

interface RegisterCostumeProps {
  body: {
    clientId: number;
    costumeId: number;
    quantity: number;
  };
}

export async function ActionRegisterLoan({
  body,
}: RegisterCostumeProps): Promise<EmprestimoResponse> {
  const parsedBody = createRequestSchemaEmprestimo.safeParse(body);

  if (!parsedBody.success) {
    return {
      success: false,
      errors: parsedBody.error.flatten().fieldErrors,
    };
  }

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
    return { success: false, errors: erro.errors };
  }

  return { success: true, message: "Emprestimo cadastrado com sucesso!" };
}

export async function ActionRemoveLoan(id: number): Promise<void> {
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

  revalidatePath("/dashboard/emprestimo");
}
