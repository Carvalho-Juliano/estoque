export const costumePaths = {
  "/api/figurino": {
    get: {
      summary: "Lista todos os figurinos.",
      tags: ["Figurino"],
      responses: {
        200: { description: "Lista de figurinos retornada com sucesso." },
      },
    },
    post: {
      summary: "Cadastra um novo figurino.",
      tags: ["Figurino"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                description: { type: "string" },
                quantity: { type: "string" },
                size: { type: "string" },
                available_quantity: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Figurino cadastrado com sucesso." },
        400: {
          description:
            "Erro na validação dos dados, algum campo inserido de forma incorreta ou tentativa de cadastrar algum email/telefone já existente.",
        },
        500: { description: "Erro ao cadastrar cliente." },
      },
    },
  },
  "/api/figurino/{id}": {
    get: {
      summary: "Obtem um figurino pelo ID.",
      tags: ["Figurino"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID do figurino",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: { description: "Lista de figurinos retornada com sucesso." },
        404: { description: "Figurino não encontrado." },
        500: { description: "Erro ao buscar figurino." },
      },
    },
    put: {
      summary: "Atualizar um figurino.",
      tags: ["Figurino"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID do figurino",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: { description: "Figurino atualizado com sucesso." },
        400: {
          description:
            "Erro na validação dos dados, algum campo inserido de forma incorreta ou tentativa de cadastrar algum email/telefone já existente.",
        },
        404: { description: "Figurino não encontrado." },
        500: { description: "Erro ao atualizar figurino." },
      },
    },
    delete: {
      summary: "Excluir um figurino.",
      tags: ["Figurino"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID do figurino",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: { description: "Figurino excluído com sucesso." },
        400: {
          description:
            "Este figurino tem um emprestimo pendente, resolva esta pendência antes de tentar excluí-lo. ",
        },
        404: { description: "Figurino não encontrado." },
        500: { description: "Erro ao excluir figurino." },
      },
    },
  },
};
