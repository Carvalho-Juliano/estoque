export const loanPath = {
  "/api/emprestimo": {
    get: {
      summary: "Lista todos os emprestimos.",
      tags: ["Emprestimo"],
      responses: {
        200: { description: "Lista de emprestimo retornada com sucesso." },
      },
    },
    post: {
      summary: "Cadastra um novo emprestimo.",
      tags: ["Emprestimo"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                costumeId: { type: "number" },
                clientId: { type: "number" },
                quantity: { type: "number" },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Emprestimo cadastrado com sucesso." },
        400: {
          description:
            "Erro na validação dos dados, algum campo inserido de forma incorreta ou tentativa de cadastrar algum email/telefone já existente.",
        },
        404: {
          description:
            "Figurino não encontrado, Cliente não encontrado, Quantidade exigida no emprestimo é superior a quantidade disponível em estoque.",
        },
        500: { description: "Erro ao cadastrar emprestimo." },
      },
    },
  },
  "/api/emprestimo/{id}": {
    get: {
      summary: "Obtem um emprestimo pelo ID.",
      tags: ["Emprestimo"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID do emprestimo",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: { description: "Emprestimo retornado com sucesso." },
        404: { description: "Emprestimo não encontrado." },
        500: { description: "Erro ao encontrar emprestimo." },
      },
    },
    delete: {
      summary: "Excluir um emprestimo",
      tags: ["Emprestimo"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID do emprestimo",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: { description: "Emprestimo excluído com sucesso." },
        404: { description: "Emprestimo não encontrado." },
        500: { description: "Erro ao excluir emprestimo." },
      },
    },
  },
};
