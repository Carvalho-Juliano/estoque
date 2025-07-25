import { z } from "zod";

//Validação para a rota POST
export const createRequestSchemaEmprestimo = z.object({
  clientId: z.number({
    required_error: "O clienteId deve ser informado",
    invalid_type_error: "O clienteId deve ser um numero",
  }),

  costumeId: z.number({
    required_error: "O figurinoId deve ser informado",
    invalid_type_error: "O figurinoId deve ser um numero",
  }),

  quantity: z
    .number({
      required_error: "Quantidade deve ser informado",
      invalid_type_error: "Quantidade deve ser um numero",
    })
    .nonnegative("Quantidade não pode ser negativa")
    .min(1, "Quantidade deve ser maior que 0"),
});
