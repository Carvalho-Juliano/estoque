import { AlreadyExistError } from "@/errors/AlreadyExistError";
import { NotFoundError } from "@/errors/NotFoundError";
import { updateUserWithoutPassword, User } from "@/model/Usuario";
import {
  createRequestSchemaUser,
  updatePasswordSchemaUsuario,
  updateRequestSchemaUsuario,
} from "@/schemas/usuario/usuarioSchema";

export interface updateUserPassword {
  currentPassword: string;
  newPassword: string;
}

export interface createUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export const userService = {
  create: async (body: createUser) => {
    const parsedBoody = createRequestSchemaUser.safeParse(body);
    if (!parsedBoody.success) {
      return {
        status: 400,
        data: {
          message: "Erro na validação dos dados",
          error: parsedBoody.error.flatten().fieldErrors,
        },
      };
    }
    const { firstName, lastName, email, phone, password } = parsedBoody.data;
    try {
      const newUser = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
      });
      return {
        status: 201,
        message: "Usuário cadastrado com sucesso.",
        usuario: newUser,
      };
    } catch (err: any) {
      if (err instanceof AlreadyExistError) {
        return { status: err.statusCode, data: { message: err.message } };
      }
      if (err instanceof Error) {
        return { status: 400, message: err.message };
      }
      return {
        status: 500,
        message: "Erro ao cadastrar usuario",
      };
    }
  },
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
          data: { message: "Usuário não encontrado" },
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

  deleteUser: async (id: number) => {
    try {
      const deletedUser = await User.deleteUser(id);
      return {
        status: 200,
        data: {
          message: "Usuário deletado com sucesso!",
          costume: deletedUser,
        },
      };
    } catch (err: any) {
      if (err instanceof NotFoundError) {
        return {
          status: err.statusCode,
          data: { message: err.message },
        };
      }
      return {
        status: 500,
        data: {
          message: "Erro ao excluir usuario",
        },
      };
    }
  },
};
