"use client";

import { ActionExcluirCliente } from "@/actions/actions-clientes";

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
      onClick={() => ActionExcluirCliente(id)}
    >
      Excluir
    </button>
  );
}
