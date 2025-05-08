import { z } from "zod";

//Validação para a rota POST
export const createRequestSchemaFigurino = z.object({
  descricao: z
    .string({
      required_error: "O campo descricao é obrigatório",
      invalid_type_error: "Descricao deve ser uma string",
    })
    .min(1, "O campo descrição não pode ser vazio")
    .refine((value) => isNaN(Number(value)), {
      message: "Descrição não pode ser um número",
    }),

  quantidade: z
    .number({
      required_error: "O campo quantidade é obrigatório",
      invalid_type_error: "Quantidade deve ser uma number",
    })
    .nonnegative("Quantidade não pode ser negativa"),

  tamanho: z.string({
    required_error: "O campo tamanho é obrigatório",
    invalid_type_error: "Tamanho deve ser uma string, exemplo:PP,P,M,G",
  }),

  disponivel: z
    .number({
      required_error: "O campo disponivel é obrigatório",
      invalid_type_error: "Disponivel deve ser uma number",
    })
    .nonnegative("Disponível não pode ser negativo"),
});

//Validação para a rota PUT
export const updateRequestSchemaFigurino = z.object({
  descricao: z
    .string({
      invalid_type_error: "Descricao deve ser uma string",
    })
    .min(1, "O campo descrição não pode ser vazio")
    .refine((value) => isNaN(Number(value)), {
      message: "Descrição não pode ser um número",
    })
    .optional(),

  quantidade: z
    .number({
      invalid_type_error: "Quantidade deve ser uma number",
    })
    .nonnegative("Quantidade não pode ser negativa")
    .optional(),

  tamanho: z
    .string({
      invalid_type_error: "Tamanho deve ser uma string, exemplo:PP,P,M,G",
    })
    .min(1, "O campo tamanho não pode ser vazio")
    .refine((value) => isNaN(Number(value)), {
      message: "Tamanho não pode ser um número",
    })
    .optional(),

  disponivel: z
    .number({
      invalid_type_error: "Disponivel deve ser uma number",
    })
    .nonnegative("Disponível não pode ser negativo")
    .optional(),
});
