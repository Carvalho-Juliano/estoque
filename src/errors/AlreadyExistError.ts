export class AlreadyExistError extends Error {
  statusCode: number;

  constructor(resource: string = "Recurso") {
    super(`${resource} já cadastrado`);
    this.name = "AlreadyExistError";
    this.statusCode = 409;
  }
}
