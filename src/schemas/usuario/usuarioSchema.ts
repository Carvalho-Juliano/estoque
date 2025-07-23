import { z } from "zod";

//Validações para a rota POST
export const createRequestSchemaUsuario = z.object({
  email: z
    .string({
      required_error: "O campo de email é obrigatório para criar um usuário",
      invalid_type_error: "Email deve ser uma string",
    })
    .email({ message: "Formato de email inválido" }),
  senha: z.string({
    required_error: "O campo de senha é obrigatório para criar um usuário",
    invalid_type_error: "Senha deve ser uma string",
  }),
});
