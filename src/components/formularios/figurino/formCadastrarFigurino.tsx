"use client";

import { ActionCadastrarFigurino } from "@/actions/actions-figurinos";
import { useState } from "react";
import { createRequestSchemaFigurino } from "@/schemas/figurino/figurinoSchema";
import Link from "next/link";

export function FormCadastrarFigurino() {
  // Estade para guardar os erros. Começa vazio até o usuário preencher o formulário com algum erro.
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);

    const data = {
      descricao: formdata.get("descricao"),
      quantidade: Number(formdata.get("quantidade")),
      tamanho: formdata.get("tamanho"),
      disponivel: Number(formdata.get("disponivel")),
    };

    const result = createRequestSchemaFigurino.safeParse(data);

    //Retorna os erros para o front-end
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors as Record<string, string>);
      return;
    }

    const response = await ActionCadastrarFigurino(formdata);

    if (response && !response.success) {
      setErrors(response.errors);
      return;
    }

    //teste de janela para confirmar o cadastro(futuramente pode ser um modal)
    window.alert("Figurino cadastrado com sucesso!");
    setErrors({});
  }

  const inputClass = (field: string) =>
    `form-control ${errors[field] ? "border border-danger" : ""}`;

  return (
    <form onSubmit={handleSubmit}>
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
            required
          />
          {errors.descricao && (
            <div className="col-auto">
              <span className="text-danger form-text">{errors.descricao}</span>
            </div>
          )}
        </div>
      </div>

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
            required
          />
          {errors.quantidade && (
            <div className="col-auto">
              <span className="text-danger form-text">{errors.quantidade}</span>
            </div>
          )}
        </div>
      </div>

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
            required
          />
          {errors.tamanho && (
            <div className="col-auto">
              <span className="text-danger form-text">{errors.tamanho}</span>
            </div>
          )}
        </div>
      </div>

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
            required
          />
          {errors.disponivel && (
            <div className="col-auto">
              <span className="text-danger form-text">{errors.disponivel}</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <button type="submit" className="btn btn-secondary">
          Enviar
        </button>
        <Link href={"/figurino"} className="btn btn-secondary ms-2">
          Voltar
        </Link>
      </div>
    </form>
  );
}
