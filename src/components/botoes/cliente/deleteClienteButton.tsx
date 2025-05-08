"use client";

import { ExcluirCliente } from "@/actions/actions-clientes";

interface ButtonDeletarClienteProps {
  id: number;
}

export default function ButtonDeletarCliente({
  id,
}: ButtonDeletarClienteProps) {
  return (
    <button
      type="button"
      className="btn btn-danger ms-2"
      onClick={() => ExcluirCliente(id)}
    >
      Excluir
    </button>
  );
}
