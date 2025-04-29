"use client";

import { ActionAtualizarFigurino } from "@/actions/actions-figurinos";
import { Figurino } from "@/model/Figurino";

interface PropsFormAtualizarFigurino {
  figurino: Figurino;
  id: number;
}

export default function FormAtualizarFigurino({
  figurino,
  id,
}: PropsFormAtualizarFigurino) {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await ActionAtualizarFigurino(formData, id);
    console.log("Figurino atualizado com sucesso!");
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="descricao" className="col-sm-1 col-form-label fs-5">
          Descrição:
        </label>
        <div className="col-sm-5">
          <input
            className="form-control"
            type="text"
            name="descricao"
            id="descricao"
            defaultValue={figurino.descricao}
            required
          />
        </div>
      </div>

      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="quantidade" className="col-sm-1 col-form-label fs-5">
          Quantidade:
        </label>
        <div className="col-sm-5">
          <input
            className="form-control"
            type="number"
            name="quantidade"
            id="quantidade"
            defaultValue={figurino.quantidade}
            required
          />
        </div>
      </div>

      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="tamanho" className="col-sm-1 col-form-label fs-5">
          Tamanho:
        </label>
        <div className="col-sm-5">
          <input
            className="form-control"
            type="text"
            name="tamanho"
            id="tamanho"
            defaultValue={figurino.tamanho}
            required
          />
        </div>
      </div>

      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="disponivel" className="col-sm-1 col-form-label fs-5">
          Disponível
        </label>
        <div className="col-sm-5">
          <input
            className="form-control"
            type="text"
            name="disponivel"
            id="disponivel"
            defaultValue={figurino.disponivel}
            required
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
