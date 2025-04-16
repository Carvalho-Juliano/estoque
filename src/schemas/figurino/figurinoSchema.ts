import { z } from "zod";

export const createRequestSchemaFigurino = z.object({
  descricao: z.string({
    required_error: "O campo descricao é obrigatório",
    invalid_type_error: "Descricao deve ser uma string",
  }),
  quantidade: z.number({
    required_error: "O campo quantidade é obrigatório",
    invalid_type_error: "Quantidade deve ser uma number",
  }),
  tamanho: z.string({
    required_error: "O campo tamanho é obrigatório",
    invalid_type_error: "Tamanho deve ser uma string, exemplo:PP,P,M,G",
  }),
  disponivel: z.number({
    required_error: "O campo disponivel é obrigatório",
    invalid_type_error: "Disponivel deve ser uma number",
  }),
});

export const updateRequestSchemaFigurino = z.object({
  descricao: z
    .string({
      invalid_type_error: "Descricao deve ser uma string",
    })
    .optional(),
  quantidade: z
    .number({
      invalid_type_error: "Quantidade deve ser uma number",
    })
    .optional(),
  tamanho: z
    .string({
      invalid_type_error: "Tamanho deve ser uma string, exemplo:PP,P,M,G",
    })
    .optional(),
  disponivel: z
    .number({
      invalid_type_error: "Disponivel deve ser uma number",
    })
    .optional(),
});
