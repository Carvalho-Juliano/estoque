import { z } from "zod";

//Validação para a rota POST
export const createRequestSchemaEmprestimo = z.object({
  clienteId: z.number({
    required_error: "O clienteId deve ser informado",
    invalid_type_error: "O clienteId deve ser um numero",
  }),

  figurinoId: z.number({
    required_error: "O figurinoId deve ser informado",
    invalid_type_error: "O figurinoId deve ser um numero",
  }),

  quantidade: z
    .number({
      required_error: "Quantidade deve ser informado",
      invalid_type_error: "Quantidade deve ser um numero",
    })
    .nonnegative("Quantidade não pode ser negativa")
    .min(1, "Quantidade deve ser maior que 0"),
});
