export class NotFoundError extends Error {
  statusCode: number;

  constructor(resource: string = "Recurso") {
    super(`${resource} não encontrado`);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}
