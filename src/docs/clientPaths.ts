export const clientPaths = {
  "/api/cliente": {
    get: {
      summary: "Lista todos os clientes",
      tags: ["Cliente"],
      responses: {
        200: { description: "Lista de clientes retornada com sucesso." },
      },
    },
    post: {
      summary: "Cadastra um novo cliente",
      tags: ["Cliente"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Cliente cadastrado com sucesso." },
        400: {
          description:
            "Erro na validação dos dados, algum campo inserido de forma incorreta ou tentativa de cadastrar algum email/telefone já existente.",
        },
        500: { description: "Erro ao cadastrar cliente" },
      },
    },
  },
  "/api/cliente/{id}": {
    get: {
      summary: "Obtem um cliente pelo ID",
      tags: ["Cliente"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "ID do cliente",
        },
      ],
      responses: {
        200: { description: "Lista de clientes retornada com sucesso." },
        404: { description: "Cliente não encontrado." },
        500: { description: "Erro ao buscar cliente." },
      },
    },
    put: {
      summary: "Atualizar um cliente",
      tags: ["Cliente"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "ID do cliente",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Cliente atualizado com sucesso." },
        400: {
          description:
            "Erro na validação dos dados, algum campo inserido de forma incorreta ou tentativa de cadastrar algum email/telefone já existente.",
        },
        404: { description: "Cliente não encontrado." },
        500: { description: "Erro ao atualizar cliente." },
      },
    },
    delete: {
      summary: "Excluir um cliente",
      tags: ["Cliente"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "ID do cliente",
        },
      ],
      responses: {
        200: { description: "Cliente excluído com sucesso." },
        400: {
          description:
            "Este cliente tem um emprestimo pendente, resolva esta pendência antes de tentar excluí-lo.",
        },
        404: { description: "Cliente não encontrado." },
        500: { description: "Erro ao excluir cliente." },
      },
    },
  },
};
