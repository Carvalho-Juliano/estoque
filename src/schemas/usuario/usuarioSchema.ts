import { z } from "zod";

export const phoneRegex = /^[1-9][0-9]{9,10}$/;

//Validações para a rota POST
export const createRequestSchemaUser = z.object({
  firstName: z.string({
    required_error: "O campo de nome é obrigatório para criar usuário",
    invalid_type_error: "Primeiro nome deve ser uma string",
  }),
  lastName: z.string({
    required_error: "O campo de nome é obrigatório para criar usuário",
    invalid_type_error: "Primeiro nome deve ser uma string",
  }),
  email: z
    .string({
      required_error: "O campo de email é obrigatório para criar um usuário",
      invalid_type_error: "Email deve ser uma string",
    })
    .email({ message: "Formato de email inválido" }),
  phone: z.string().regex(phoneRegex, {
    message: "O número de telefone deve ter 10 ou 11 dígitos",
  }),
  password: z.string({
    required_error: "O campo de senha é obrigatório para criar um usuário",
    invalid_type_error: "Senha deve ser uma string",
  }),
});

export const updateRequestSchemaUsuario = z.object({
  firstName: z
    .string({
      required_error: "O campo de nome é obrigatório para criar usuário",
      invalid_type_error: "Primeiro nome deve ser uma string",
    })
    .regex(/^[A-Za-z]/, {
      message: "O nome deve conter apenas letras",
    })
    .optional(),
  lastName: z
    .string({
      required_error: "O campo de sobrenome é obrigatório para criar usuário",
      invalid_type_error: "Sobrenome nome deve ser uma string",
    })
    .regex(/^[A-Za-z]/, {
      message: "O sobrenome deve conter apenas letras",
    })
    .optional(),
  email: z
    .string({
      required_error: "O campo de email é obrigatório para criar um usuário",
      invalid_type_error: "Email deve ser uma string",
    })
    .email({ message: "Formato de email inválido" })
    .optional(),
  phone: z
    .string({
      required_error: "O campo de telefone é obrigatório para criar um usuário",
      invalid_type_error: "Telefone deve ser uma string",
    })
    .regex(phoneRegex, {
      message: "O número de telefone deve ter 10 ou 11 dígitos",
    })
    .optional(),
});

export const updatePasswordSchemaUsuario = z.object({
  currentPassword: z
    .string({
      required_error:
        "O campo senha atual é obrigatório para atualizar a senha",
      invalid_type_error: "O campo senha deve ser uma string",
    })
    .min(6, { message: "O campo senha deve ter no minimo 6 caracteres" }),
  newPassword: z
    .string({
      required_error:
        "A o campo nova senha é obrigatório para cadastrar uma nova senha",
      invalid_type_error: "O campo senha deve ser uma string",
    })
    .min(6, { message: "O campo senha deve ter no minimo 6 caracteres" }),
});
