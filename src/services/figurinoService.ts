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
      if (!costume) {
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
          figurino: costume,
        },
      };
    } catch (err: any) {
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
    const existingCostume = await Costume.getById(id);
    if (!existingCostume) {
      return {
        status: 404,
        data: {
          message: "Figurino não encontrado",
        },
      };
    }
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
      const relatedLoan = await Costume.verifyRelatedCustomLoan(id);
      if (relatedLoan !== null) {
        return {
          status: 400,
          data: {
            message:
              "Esse figurino tem um emprestimo pendente, resolva esta pendência antes de tentar exclui-lo",
          },
        };
      }
      const deletedCostume = await Costume.deleteCostume(id);
      if (!deletedCostume) {
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
          message: "Figurino Excluido com sucesso!",
          costume: deletedCostume,
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
