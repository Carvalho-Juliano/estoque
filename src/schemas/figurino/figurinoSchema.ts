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

  tamanho: z
    .string({
      required_error: "O campo tamanho é obrigatório",
      invalid_type_error: "Tamanho deve ser um texto, exemplo:PP,P,M,G",
    })
    .min(1, "O campo tamanho não pode ser vazio")
    .refine((value) => isNaN(Number(value)), {
      message: "Tamanho deve ser um texto, exemplo:PP,P,M,G",
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
    .string({
      invalid_type_error: "Tamanho deve ser um texto, exemplo:PP,P,M,G",
    })
    .min(1, "O campo tamanho não pode ser vazio")
    .refine((value) => isNaN(Number(value)), {
      message:
        "Tamanho não pode ser um número, exemplos de valores validos:PP,P,M,G",
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
