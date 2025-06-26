import { z } from "zod";

//Validações Zod para a rota POST (Criar figurinos)
export const createRequestSchemaFigurino = z.object({
  descricao: z
    .string({
      required_error: "O campo descricao é obrigatório",
      invalid_type_error: "Descricao nao deve ser número",
    })
    .min(1, "O campo descrição não pode ser vazio")
    .refine((value) => isNaN(Number(value)), {
      message: "Descrição nao deve ser número",
    }),

  quantidade: z
    .number({
      required_error: "O campo quantidade é obrigatório",
      invalid_type_error: "Quantidade deve ser um número",
    })
    .nonnegative("Quantidade não pode ser negativa"),

  tamanho: z.enum(["PP", "P", "M", "G", "GG"], {
    errorMap: () => ({
      message: "Valor inválido, o campo tamanho deve receber: PP,P,M,G ou GG",
    }),
  }),

  disponivel: z
    .number({
      required_error: "O campo disponível é obrigatório",
      invalid_type_error: "Disponível deve ser um número",
    })
    .nonnegative("Disponível não pode ser negativo"),
});

//Validações Zod para a rota PUT (Atualizar figurinos)
export const updateRequestSchemaFigurino = z.object({
  descricao: z
    .string({
      invalid_type_error: "Descricao nao deve ser número",
    })
    .min(1, "O campo descrição não pode ser vazio")
    .refine((value) => isNaN(Number(value)), {
      message: "Descricao nao deve ser número",
    })
    .optional(),

  quantidade: z
    .number({
      invalid_type_error: "Quantidade deve ser uma número",
    })
    .min(1, "O campo quantidade não pode ser vazio")
    .nonnegative("Quantidade não pode ser negativa")
    .optional(),

  tamanho: z
    .enum(["PP", "P", "M", "G", "GG"], {
      errorMap: () => ({
        message: "Valor inválido, o campo tamanho deve receber: PP,P,M,G ou GG",
      }),
    })
    .optional(),

  disponivel: z
    .number({
      invalid_type_error: "Disponível deve ser um número",
    })
    .min(1, "O campo disponível não pode ser vazio")
    .nonnegative("Disponível não pode ser negativo")
    .optional(),
});
