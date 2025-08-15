export class AlreadyExistError extends Error {
  statusCode: number;

  constructor(resource: string = "Recurso") {
    super(`${resource} já cadastrado`);
    this.name = "AlreadyExistError";
    this.statusCode = 409;
  }
}

export class NotFoundError extends Error {
  statusCode: number;

  constructor(resource: string = "Recurso") {
    super(`${resource} não encontrado`);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

export class PendingLoanError extends Error {
  statusCode: number;

  constructor(
    message: "Existe um emprestimo pendente envolvendo esse figurino ou cliente, resolva esta pendência antes de exclui-lo"
  ) {
    super(message);
    this.name = "PendingLoanError";
    this.statusCode = 400;
  }
}
