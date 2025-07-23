import { AtributosFigurino, Figurino } from "@/model/Figurino";
import {
  createRequestSchemaFigurino,
  updateRequestSchemaFigurino,
} from "@/schemas/figurino/figurinoSchema";

export const figurinoService = {
  listarTodosFigurinos: async () => {
    return await Figurino.findAll();
  },

  cadastrarFigurino: async (body: AtributosFigurino) => {
    const parsedBody = createRequestSchemaFigurino.safeParse(body);

    if (!parsedBody.success) {
      return {
        status: 400,
        data: {
          message: "Erro na validação dos dados",
          errors: parsedBody.error.flatten().fieldErrors,
        },
      };
    }
    const { descricao, quantidade, tamanho, disponivel } = parsedBody.data;
    try {
      const novoFigurino = await Figurino.createFigurino({
        descricao,
        quantidade,
        tamanho,
        disponivel,
      });
      return {
        status: 201,
        data: {
          message: "Figurino cadastrado com sucesso!",
          figurino: novoFigurino,
        },
      };
    } catch (err: any) {
      return { status: 500, data: { message: "Erro ao cadastrar figurino" } };
    }
  },

  figurinoPeloId: async (id: number) => {
    try {
      const figurino = await Figurino.getById(id);
      if (!figurino) {
        return {
          status: 404,
          data: {
            message: "Figurino não encontrado",
          },
        };
      }
      return {
        status: 200,
        data: {
          figurino: figurino,
        },
      };
    } catch (err: any) {
      return { status: 500, data: { message: "Erro ao encontrar figurino!" } };
    }
  },

  atualizarFigurino: async (id: number, body: AtributosFigurino) => {
    const parsedBody = updateRequestSchemaFigurino.safeParse(body);
    if (!parsedBody.success) {
      return {
        status: 400,
        data: {
          message: "Erro na validação dos dados",
          error: parsedBody.error.flatten().fieldErrors,
        },
      };
    }
    const { descricao, quantidade, tamanho, disponivel } = parsedBody.data;
    try {
      const figurinoAtualizado = await Figurino.updateFigurino(id, {
        descricao,
        quantidade,
        tamanho,
        disponivel,
      });
      return {
        status: 200,
        data: {
          message: "Figurino atualizado com sucesso!",
          figurino: figurinoAtualizado,
        },
      };
    } catch (err: any) {
      return {
        status: 500,
        data: {
          message: "Erro ao atualizar figurino",
        },
      };
    }
  },

  deletarFigurino: async (id: number) => {
    try {
      const figurinoDeletado = await Figurino.delete(id);
      return {
        status: 200,
        data: {
          message: "Figurino Excluido com sucesso!",
          figurino: figurinoDeletado,
        },
      };
    } catch (err: any) {
      return {
        status: 500,
        data: { message: "Erro ao excluir figurino" },
      };
    }
  },
};
