import { updateRequestSchemaUsuario } from "@/schemas/usuario/usuarioSchema";

type userResponse =
  | { success: true }
  | { success: false; errors: Record<string, string> };

interface UserPasswordUpdate {
  currentPassword: string;
  newPassword: string;
}

interface UserUpdateWithoutPassword {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export async function ActionUpdateUserWithoutPassword(id: number, body: {}) {
  const parsedBody = updateRequestSchemaUsuario.safeParse(body);
  if (!parsedBody.success) {
    return {
      success: false,
      errors: parsedBody.error.flatten().fieldErrors,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/usuario/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return { success: false, errors: data.errors ?? {} };
    }

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      errors: "Erro ao atualizar os dados do usuário",
    };
  }
}

export async function ActionUserUpdatePassword(
  id: number,
  currentPassword: string,
  newPassword: string
): Promise<userResponse | UserPasswordUpdate> {
  const body = {
    currentPassword,
    newPassword,
  };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/usuario/${id}/senha`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    return { success: false, errors: error };
  }

  return { success: true };
}
