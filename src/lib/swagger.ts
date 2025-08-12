import { clientPaths } from "@/docs/clientPaths";
import { costumePaths } from "@/docs/costumePaths";
import { userPaths } from "@/docs/userPaths";
import { loanPath } from "@/docs/loanPaths";

export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "API para um sistema de estoque de figurinos",
    version: "1.0.0",
    description: "Documentação da api para o sistema de estoque de figurinos",
  },
  paths: {
    ...clientPaths,
    ...costumePaths,
    ...userPaths,
    ...loanPath,
  },
};
