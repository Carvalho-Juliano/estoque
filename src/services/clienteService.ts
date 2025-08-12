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
      if (err instanceof Error) {
        return { status: 400, data: { message: err.message } };
      }
      return { status: 500, data: { message: "Erro ao cadastrar cliente" } };
    }
  },

  clientById: async (id: number) => {
    try {
      const client = await Client.getById(id);
      if (!client) {
        return {
          status: 404,
          data: { message: "Cliente não encontrado no banco de dados" },
        };
      }
      return { status: 200, data: client };
    } catch (err: any) {
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
    const existingClient = await Client.getById(id);
    if (!existingClient) {
      return {
        status: 404,
        data: {
          message: "Cliente não encontrado",
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
      if (!deletedClient) {
        return {
          status: 404,
          data: {
            message: "Cliente não encontrado",
          },
        };
      }
      return {
        status: 200,
        data: {
          message: "Cliente excluido com sucesso!",
          cliente: deletedClient,
        },
      };
    } catch (err: any) {
      if (err instanceof Error && err.message.includes("emprestimo pendente")) {
        return {
          status: 400,
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
