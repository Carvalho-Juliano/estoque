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
