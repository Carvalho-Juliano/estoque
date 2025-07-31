import { updateUserWithoutPassword, User } from "@/model/Usuario";
import {
  updatePasswordSchemaUsuario,
  updateRequestSchemaUsuario,
} from "@/schemas/usuario/usuarioSchema";

export interface updateUserPassword {
  currentPassword: string;
  newPassword: string;
}

export const userService = {
  create: async () => {},
  updateUserWithoutPassword: async (
    id: number,
    body: updateUserWithoutPassword
  ) => {
    const parsedBody = updateRequestSchemaUsuario.safeParse(body);
    if (!parsedBody.success) {
      return {
        status: 400,
        data: {
          message: "Erro na validação dos dados",
          error: parsedBody.error.flatten().fieldErrors,
        },
      };
    }
    const { firstName, lastName, email, phone } = parsedBody.data;
    try {
      const updatedUser = await User.updateUserWithoutPassword(id, {
        firstName,
        lastName,
        email,
        phone,
      });
      return {
        status: 200,
        data: {
          message: "Usuario atualizado com sucesso!",
          usuario: updatedUser,
        },
      };
    } catch (err: any) {
      return {
        status: 500,
        data: {
          message: "Erro ao atualizar usuario",
        },
      };
    }
  },
  updateUserPassword: async (id: number, body: updateUserPassword) => {
    const parsedBody = updatePasswordSchemaUsuario.safeParse(body);
    if (!parsedBody.success) {
      return {
        status: 400,
        data: {
          message: "Erro na validação dos dados",
          error: parsedBody.error.flatten().fieldErrors,
        },
      };
    }
    const { currentPassword, newPassword } = parsedBody.data;

    try {
      const updatedUser = await User.updateUserPassword(
        id,
        currentPassword,
        newPassword
      );
      if (!updatedUser) {
        return {
          status: 404,
          data: { message: "Usuário não encontrado ou senha inválida" },
        };
      }

      return {
        status: 200,
        data: { message: "Senha atualizada com sucesso!" },
      };
    } catch (err: any) {
      if (err instanceof Error) {
        return { status: 400, data: { message: err.message } };
      }
      return {
        status: 500,
        data: { message: "Erro ao atualizar senha!" },
      };
    }
  },
};
