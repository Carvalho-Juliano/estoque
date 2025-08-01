import { z } from "zod";
import { phoneRegex } from "../usuario/usuarioSchema";

//Validação para a rota POST
export const createRequestSchemaCliente = z.object({
  name: z
    .string({
      required_error: "O campo nome é obrigatório",
      invalid_type_error: "O nome deve ser uma string",
    })
    .refine((value) => isNaN(Number(value)), {
      message: "Nome não pode ser um número",
    }),

  email: z.string().email({ message: "Formato de email inválido" }),

  phone: z
    .string({
      required_error: "O campo telefone é obrigatório",
      invalid_type_error: "O telefone deve ser uma string",
    })
    .regex(phoneRegex, {
      message: "O número de telefone deve ter 10 ou 11 dígitos",
    }),
});

//Validação para a tora PUT
export const updateRequestSchemaCliente = z.object({
  name: z
    .string({ invalid_type_error: "O nome deve ser uma string" })
    .refine((value) => isNaN(Number(value)), {
      message: "Nome não pode ser um número",
    })
    .optional(),
  email: z
    .string({ invalid_type_error: "O email deve ser uma string" })
    .email({ message: "Formato de email inválido" })
    .optional(),
  phone: z
    .string({ invalid_type_error: "O nome deve ser uma string" })
    .regex(phoneRegex, {
      message: "O número de telefone deve ter 10 ou 11 dígitos",
    })
    .optional(),
});
