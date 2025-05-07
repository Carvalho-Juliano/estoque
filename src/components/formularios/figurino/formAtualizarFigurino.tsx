"use client";

import { updateRequestSchemaFigurino } from "@/schemas/figurino/figurinoSchema";
import { useState } from "react";
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
  //Estado para guardar os erros.Começa vázio ate o usuario preencher o formulario com algum erro.
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      descricao: formData.get("descricao"),
      quantidade: Number(formData.get("quantidade")),
      tamanho: formData.get("tamanho"),
      disponivel: Number(formData.get("disponivel")),
    };

    const result = updateRequestSchemaFigurino.safeParse(data);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors as Record<string, string>);
      return;
    }

    setErrors({});
    await ActionAtualizarFigurino(formData, id);
    console.log("Figurino atualizado com sucesso!");
  }

  const inputClass = (field: string) =>
    `form-control ${errors[field] ? "border border-danger" : ""}`;

  return (
    <form onSubmit={handleSubmit}>
      {/*Descrição*/}
      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="descricao" className="col-sm-1 col-form-label fs-5">
          Descrição:
        </label>
        <div className="col-sm-5">
          <input
            className={inputClass("descricao")}
            type="text"
            name="descricao"
            id="descricao"
            defaultValue={figurino.descricao}
            required
          />
          {errors.descricao && (
            <div className="col-auto">
              <span className="text-danger form-text">{errors.descricao}</span>
            </div>
          )}
        </div>
      </div>

      {/*Quantidade*/}
      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="quantidade" className="col-sm-1 col-form-label fs-5">
          Quantidade:
        </label>
        <div className="col-sm-5">
          <input
            className={inputClass("quantidade")}
            type="number"
            name="quantidade"
            id="quantidade"
            defaultValue={figurino.quantidade}
            required
          />
          {errors.quantidade && (
            <div className="text-danger mt-1">{errors.quantidade}</div>
          )}
        </div>
      </div>

      {/*Tamanho*/}
      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="tamanho" className="col-sm-1 col-form-label fs-5">
          Tamanho:
        </label>
        <div className="col-sm-5">
          <input
            className={inputClass("tamanho")}
            type="text"
            name="tamanho"
            id="tamanho"
            defaultValue={figurino.tamanho}
            required
          />
          {errors.tamanho && (
            <div className="text-danger mt-1">{errors.tamanho}</div>
          )}
        </div>
      </div>

      {/*Disponível*/}
      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="disponivel" className="col-sm-1 col-form-label fs-5">
          Disponível
        </label>
        <div className="col-sm-5">
          <input
            className={inputClass("disponivel")}
            type="text"
            name="disponivel"
            id="disponivel"
            defaultValue={figurino.disponivel}
            required
          />
          {errors.disponivel && (
            <div className="text-danger mt-1">{errors.disponivel}</div>
          )}
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
