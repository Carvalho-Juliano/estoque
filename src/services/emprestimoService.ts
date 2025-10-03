import { NotFoundError } from "@/errors/NotFoundError";
import { loanAttributes, Emprestimo } from "@/model/Emprestimo";
import { createRequestSchemaEmprestimo } from "@/schemas/emprestimo/emprestimoSchema";

export const loanService = {
  listAllLoans: async () => {
    return Emprestimo.findAll();
  },

  registerLoan: async (body: loanAttributes) => {
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
    const { clientId, costumeId, quantity } = parsedBody.data;

    try {
      const newLoan = await Emprestimo.createLoan(costumeId, clientId, {
        quantity,
      });
      return {
        status: 201,
        data: {
          message: "Emprestimo cadastrado com sucesso!",
          emprestimo: newLoan,
        },
      };
    } catch (err: any) {
      if (err instanceof NotFoundError) {
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
          message: "Erro ao cadastrar emprestimo",
          errors: { _global: ["Erro ao cadastrar empréstimo"] },
        },
      };
    }
  },

  loanById: async (id: number) => {
    try {
      const loan = await Emprestimo.findById(id);
      return {
        status: 200,
        data: {
          emprestimo: loan,
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
        data: { message: "Erro ao encontrar o emprestimo" },
      };
    }
  },

  deleteLoan: async (id: number) => {
    try {
      const deletedLoan = await Emprestimo.deleteLoan(id);
      return {
        status: 200,
        data: {
          message: "Emprestimo excluido com sucesso!",
          emprestimo: deletedLoan,
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
        data: { message: "Erro ao excluir emprestimo" },
      };
    }
  },
};
