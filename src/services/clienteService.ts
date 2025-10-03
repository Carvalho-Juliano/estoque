import { AlreadyExistError } from "@/errors/AlreadyExistError";
import { NotFoundError } from "@/errors/NotFoundError";
import { PendingLoanError } from "@/errors/PendingLoanError";
import { Client, ClientAttributes } from "@/model/Cliente";
import {
  createRequestSchemaCliente,
  updateRequestSchemaCliente,
} from "@/schemas/cliente/clienteSchema";

export const clientService = {
  listAllClients: async () => {
    return await Client.findAll();
  },

  register: async (body: ClientAttributes) => {
    const parsedBody = createRequestSchemaCliente.safeParse(body);
    if (!parsedBody.success) {
      return {
        status: 400,
        data: {
          message: "Erro na validação dos dados",
          errors: parsedBody.error.flatten().fieldErrors,
        },
      };
    }

    const { name, phone, email } = parsedBody.data;
    try {
      const newClient = await Client.registerClient({
        name,
        phone,
        email,
      });
      return { status: 201, data: newClient };
    } catch (err: any) {
      if (err instanceof AlreadyExistError) {
        return { status: err.statusCode, data: { message: err.message } };
      }
      if (err instanceof NotFoundError) {
        return { status: err.statusCode, data: { message: err.message } };
      }
      return { status: 500, data: { message: "Erro ao cadastrar cliente" } };
    }
  },

  clientById: async (id: number) => {
    try {
      const client = await Client.getById(id);
      return { status: 200, data: client };
    } catch (err: any) {
      if (err instanceof NotFoundError) {
        return { status: err.statusCode, data: { message: err.message } };
      }
      return { status: 500, data: { message: "Erro ao buscar cliente" } };
    }
  },

  updateClient: async (id: number, body: ClientAttributes) => {
    const parsedBody = updateRequestSchemaCliente.safeParse(body);
    if (!parsedBody.success) {
      return {
        status: 400,
        data: {
          message: "Erro na validação dos dados",
          errors: parsedBody.error.flatten().fieldErrors,
        },
      };
    }
    const { name, email, phone } = parsedBody.data;
    try {
      const updatedClient = await Client.updateClient(id, {
        name,
        email,
        phone,
      });
      return {
        status: 200,
        data: {
          message: "Cliente atualizado com sucesso!",
          cliente: updatedClient,
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
          message: "Erro ao atualizar cliente",
        },
      };
    }
  },

  deleteClient: async (id: number) => {
    try {
      await Client.verifyRelatedClientLoan(id);
      const deletedClient = await Client.delete(id);
      return {
        status: 200,
        data: {
          message: "Cliente excluido com sucesso!",
          cliente: deletedClient,
        },
      };
    } catch (err: any) {
      if (err instanceof NotFoundError) {
        return {
          status: err.statusCode,
          data: {
            message: err.message,
          },
        };
      }
      if (
        err instanceof PendingLoanError &&
        err.message.includes("emprestimo pendente")
      ) {
        return {
          status: err.statusCode,
          data: {
            message: err.message,
            errors: { _global: [err.message] },
          },
        };
      }
      return {
        status: 500,
        data: {
          message: "Erro ao excluir cliente",
          errors: { _global: ["Erro ao excluir o cliente"] },
        },
      };
    }
  },
};
