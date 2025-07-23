import { Cliente, ClientAttributes } from "@/model/Cliente";
import {
  createRequestSchemaCliente,
  updateRequestSchemaCliente,
} from "@/schemas/cliente/clienteSchema";

export const clienteService = {
  listarTodos: async () => {
    return await Cliente.findAll();
  },

  cadastrar: async (body: ClientAttributes) => {
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

    const { nome, telefone, email = null } = parsedBody.data;
    try {
      const novoCliente = await Cliente.createCliente({
        nome,
        telefone,
        email,
      });
      return { status: 201, data: novoCliente };
    } catch (err: any) {
      if (
        err.message === "Email já cadastrado." ||
        err.message === "Telefone já cadastrado."
      ) {
        return { status: 400, data: { message: err.message } };
      }
      return { status: 500, data: { message: "Erro ao cadastrar cliente" } };
    }
  },

  clientePeloId: async (id: number) => {
    try {
      const cliente = await Cliente.getById(id);
      if (!cliente) {
        return {
          status: 404,
          data: { message: "Cliente não encontrado no banco de dados" },
        };
      }
      return { status: 200, data: cliente };
    } catch (err: any) {
      return { status: 500, data: { message: "Erro ao buscar cliente" } };
    }
  },

  atualizarCliente: async (id: number, body: ClientAttributes) => {
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
    const { nome, email, telefone } = parsedBody.data;
    try {
      const clienteAtualizado = await Cliente.updateCliente(id, {
        nome,
        email,
        telefone,
      });
      return {
        status: 200,
        data: {
          message: "Cliente atualizado com sucesso!",
          cliente: clienteAtualizado,
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

  excluirCliente: async (id: number) => {
    try {
      const clienteDeletado = await Cliente.delete(id);
      return {
        status: 200,
        data: {
          cliente: clienteDeletado,
          message: "Cliente excluido com sucesso!",
        },
      };
    } catch (err: any) {
      return {
        status: 500,
        data: { message: "Erro ao excluir cliente" },
      };
    }
  },
};
