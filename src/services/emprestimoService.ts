import { AtributosEmprestimo, Emprestimo } from "@/model/Emprestimo";
import { createRequestSchemaEmprestimo } from "@/schemas/emprestimo/emprestimoSchema";

export const emprestimoService = {
  listarTodosEmprestimos: async () => {
    return Emprestimo.findAll();
  },

  cadastrarEmprestimo: async (body: AtributosEmprestimo) => {
    const parsedBody = createRequestSchemaEmprestimo.safeParse(body);
    if (!parsedBody.success) {
      return {
        status: 400,
        data: {
          message: "Erro na validação dos dados",
          errors: parsedBody.error.flatten().fieldErrors,
        },
      };
    }
    const { clienteId, figurinoId, quantidade } = parsedBody.data;
    const novoEmprestimo = await Emprestimo.createEmprestimo(
      figurinoId,
      clienteId,
      { quantidade }
    );
    return {
      status: 201,
      data: {
        emprestimo: novoEmprestimo,
        message: "Emprestimo cadastrado com sucesso!",
      },
    };
  },

  emprestimoPeloId: async (id: number) => {
    const emprestimo = await Emprestimo.findById(id);
    if (!emprestimo) {
      return {
        status: 404,
        message: "Emprestimo não encontrado",
      };
    }
    return {
      status: 200,
      data: {
        emprestimo: emprestimo,
      },
    };
  },

  deletarEmprestimo: async (id: number) => {
    const emprestimoDeletado = await Emprestimo.delete(id);
    return {
      status: 200,
      data: {
        message: "Emprestimo excluido com sucesso!",
        emprestimo: emprestimoDeletado,
      },
    };
  },
};
