export const userPaths = {
  "/api/usuario": {
    get: {
      summary: "Lista todos os usuarios.",
      tags: ["Usuario"],
      responses: {
        200: { description: "Lista de usuarios retornada com sucesso." },
      },
    },
    post: {
      summary: "Cadastra um novo usuario.",
      tags: ["Usuario"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                firstName: { type: "string" },
                lastName: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
                password: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        201: { description: "Usario cadastrado com sucesso." },
        400: {
          description:
            "Erro na validação dos dados, algum campo inserido de forma incorreta ou tentativa de cadastrar algum email/telefone já existente.",
        },
        500: { description: "Erro ao cadastrar usuário." },
      },
    },
  },
  "/api/usuario/{id}": {
    get: {
      summary: "Obtem um usuário pelo ID.",
      tags: ["Usuario"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID do usuário",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: { description: "Lista de usuários retornada com sucesso." },
        404: { description: "Usuário não encontrado." },
        500: { description: "Erro ao buscar usuário." },
      },
    },
    put: {
      summary: "Atualizar um usuário sem a senha.",
      tags: ["Usuario"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "ID do usuário",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                firstName: { type: "string" },
                lastName: { type: "string" },
                email: { type: "string" },
                phone: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: { description: "Usuário atualizado com sucesso." },
        400: {
          description:
            "Erro na validação dos dados, algum campo inserido de forma incorreta ou tentativa de cadastrar algum email/telefone já existente.",
        },
        404: { description: "Usuário não encontrado." },
        500: { description: "Erro ao atualizar figurino." },
      },
    },
    delete: {
      summary: "Excluir um usuário.",
      tags: ["Usuario"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID do usuário",
          schema: {
            type: "string",
          },
        },
      ],
      responses: {
        200: { description: "Usuário excluído com sucesso." },
        404: { description: "Usuário não encontrado." },
        500: { description: "Erro ao excluir usuário." },
      },
    },
  },
};
