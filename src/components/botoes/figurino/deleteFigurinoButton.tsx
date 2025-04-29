"use client";

import { ExcluirFigurino } from "@/actions/actions-figurinos";

interface ButtonDeletarFigurinoProps {
  id: number;
}

export default function ButtonDeletarFigurino({
  id,
}: ButtonDeletarFigurinoProps) {
  return (
    <button
      type="button"
      className="btn btn-danger ms-2"
      onClick={() => ExcluirFigurino(id)}
    >
      Excluir
    </button>
  );
}
