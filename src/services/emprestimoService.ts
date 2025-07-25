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
      if (err instanceof Error) {
        return {
          status: 400,
          data: { message: err.message },
        };
      }
      return {
        status: 500,
        data: { message: "Erro ao cadastrar emprestimo" },
      };
    }
  },

  loanById: async (id: number) => {
    try {
      const loan = await Emprestimo.findById(id);
      if (!loan) {
        return {
          status: 404,
          message: "Emprestimo não encontrado",
        };
      }
      return {
        status: 200,
        data: {
          emprestimo: loan,
        },
      };
    } catch (err: any) {
      return {
        status: 500,
        data: { message: "Erro ao encontrar o emprestimo" },
      };
    }
  },

  deleteLoan: async (id: number) => {
    try {
      const detailedLoan = await Emprestimo.deleteLoan(id);
      return {
        status: 200,
        data: {
          message: "Emprestimo excluido com sucesso!",
          emprestimo: detailedLoan,
        },
      };
    } catch (err: any) {
      return {
        status: 500,
        data: { message: "Erro ao excluir emprestimo" },
      };
    }
  },
};
