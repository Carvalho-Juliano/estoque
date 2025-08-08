import { z } from "zod";

//Validações Zod para a rota POST (Criar figurinos)
export const createRequestSchemaFigurino = z.object({
  description: z
    .string({
      required_error: "O campo descricao é obrigatório",
      invalid_type_error: "Descricao nao deve ser número",
    })
    .min(1, "O campo descrição não pode ser vazio")
    .refine((value) => isNaN(Number(value)), {
      message: "Descrição nao deve ser número",
    }),

  quantity: z
    .number({
      required_error: "O campo quantidade é obrigatório",
      invalid_type_error: "Quantidade deve ser um número",
    })
    .nonnegative("Quantidade não pode ser negativa"),

  size: z.enum(["PP", "P", "M", "G", "GG"], {
    errorMap: () => ({
      message: "Valor inválido, o campo tamanho deve receber: PP,P,M,G ou GG",
    }),
  }),

  available_quantity: z
    .number({
      required_error: "O campo disponível é obrigatório",
      invalid_type_error: "Disponível deve ser um número",
    })
    .nonnegative("Disponível não pode ser negativo"),
});

export const updateRequestSchemaFigurino = z.object({
  description: z
    .string({
      invalid_type_error: "Descricao nao deve ser número",
    })
    .min(1, "O campo descrição não pode ser vazio")
    .refine((value) => isNaN(Number(value)), {
      message: "Descricao nao deve ser número",
    })
    .optional(),

  quantity: z
    .number({
      invalid_type_error: "Quantidade deve ser uma número",
    })
    .min(1, "O campo quantidade não pode ser vazio")
    .nonnegative("Quantidade não pode ser negativa")
    .optional(),

  size: z
    .enum(["PP", "P", "M", "G", "GG"], {
      errorMap: () => ({
        message: "Valor inválido, o campo tamanho deve receber: PP,P,M,G ou GG",
      }),
    })
    .optional(),

  available_quantity: z
    .number({
      invalid_type_error: "Disponível deve ser um número",
    })
    .min(1, "O campo disponível não pode ser vazio")
    .nonnegative("Disponível não pode ser negativo")
    .optional(),
});
