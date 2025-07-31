"use client";

import { ActionAtualizarCliente } from "@/actions/actions-clientes";
import { Client } from "@/model/Cliente";

interface propsFormAtualizarCliente {
  cliente: Client;
  id: number;
}

export default function FormAtualizarCliente1({
  cliente,
  id,
}: propsFormAtualizarCliente) {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await ActionAtualizarCliente(formData, id);
    console.log("Cliente atualizado com sucesso!");
  }

  return (
    /*Nome, telefone, email*/
    <form onSubmit={handleSubmit}>
      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="nome" className="col-sm-1 col-form-label fs-5">
          Nome:
        </label>
        <div className="col-sm-5">
          <input
            className="form-control"
            type="text"
            name="nome"
            id="nome"
            defaultValue={cliente.name}
            required
          />
        </div>
      </div>

      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="telefone" className="col-sm-1 col-form-label fs-5">
          Telefone:
        </label>
        <div className="col-sm-5">
          <input
            className="form-control"
            type="tel"
            name="telefone"
            id="telefone"
            defaultValue={cliente.phone}
            required
          />
        </div>
      </div>

      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="email" className="col-sm-1 col-form-label fs-5">
          Email:
        </label>
        <div className="col-sm-5">
          <input
            className="form-control"
            type="email"
            name="email"
            id="email"
            defaultValue={cliente.email}
          />
        </div>
      </div>
      <div>
        <button type="submit" className="btn btn-secondary">
          Atualizar
        </button>
      </div>
    </form>
  );
}
