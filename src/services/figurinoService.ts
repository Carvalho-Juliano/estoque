import { NotFoundError } from "@/errors/NotFoundError";
import { CostumeAttributes, Costume } from "@/model/Figurino";
import {
  createRequestSchemaFigurino,
  updateRequestSchemaFigurino,
} from "@/schemas/figurino/figurinoSchema";

export const costumeService = {
  listAllCostumes: async () => {
    return await Costume.findAll();
  },

  registerCostume: async (body: CostumeAttributes) => {
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
    const { description, quantity, size, available_quantity } = parsedBody.data;
    try {
      const newCostume = await Costume.createCostume({
        description,
        quantity,
        size,
        available_quantity,
      });
      return {
        status: 201,
        data: {
          message: "Figurino cadastrado com sucesso!",
          figurino: newCostume,
        },
      };
    } catch (err: any) {
      return { status: 500, data: { message: "Erro ao cadastrar figurino" } };
    }
  },

  costumeById: async (id: number) => {
    try {
      const costume = await Costume.getById(id);
      return {
        status: 200,
        data: {
          figurino: costume,
        },
      };
    } catch (err: any) {
      if (err instanceof NotFoundError) {
        return { status: err.statusCode, data: { message: err.message } };
      }
      return { status: 500, data: { message: "Erro ao encontrar figurino!" } };
    }
  },

  updateCostume: async (id: number, body: CostumeAttributes) => {
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
    const { description, quantity, size, available_quantity } = parsedBody.data;
    try {
      const updatedCostume = await Costume.updateCostume(id, {
        description,
        quantity,
        size,
        available_quantity,
      });
      return {
        status: 200,
        data: {
          message: "Figurino atualizado com sucesso!",
          costume: updatedCostume,
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
      return {
        status: 500,
        data: {
          message: "Erro ao atualizar figurino",
        },
      };
    }
  },

  deleteCostume: async (id: number) => {
    try {
      await Costume.verifyRelatedCustomLoan(id);
      const deletedCostume = await Costume.deleteCostume(id);
      return {
        status: 200,
        data: {
          message: "Figurino Excluido com sucesso!",
          costume: deletedCostume,
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
          message: "Erro ao excluir figurino",
          errors: { _global: ["Erro ao excluir o figurino"] },
        },
      };
    }
  },
};
