import { z } from "zod";

//Validação dos campos com Zod

//Validação para a rota POST
export const createRequestSchemaCliente = z.object({
  nome: z
    .string({
      required_error: "O campo nome é obrigatório",
      invalid_type_error: "O nome deve ser uma string",
    })
    .refine((value) => isNaN(Number(value)), {
      message: "Nome não pode ser um número",
    }),

  email: z.string().optional(),

  telefone: z.string({
    required_error: "O campo telefone é obrigatório",
    invalid_type_error: "O telefone deve ser uma string",
  }),
});

//Validação para a tora PUT
export const updateRequestSchemaCliente = z.object({
  nome: z
    .string({ invalid_type_error: "O nome deve ser uma string" })
    .refine((value) => isNaN(Number(value)), {
      message: "Nome não pode ser um número",
    })
    .optional(),
  email: z
    .string({ invalid_type_error: "O email deve ser uma string" })
    .optional(),
  telefone: z
    .string({ invalid_type_error: "O nome deve ser uma string" })
    .optional(),
});
