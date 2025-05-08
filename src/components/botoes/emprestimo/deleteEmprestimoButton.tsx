"use client";

import { ActionExcluirEmprestimo } from "@/actions/actions-emprestimos";

interface ButtonDeletarEmprestimoProps {
  id: number;
}

export default function ButtonDeletarEmprestimo({
  id,
}: ButtonDeletarEmprestimoProps) {
  return (
    <button
      type="button"
      className="btn btn-danger ms-2"
      onClick={() => ActionExcluirEmprestimo(id)}
    >
      Excluir
    </button>
  );
}
