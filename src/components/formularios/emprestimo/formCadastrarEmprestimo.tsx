"use client";

import { ActionCadastrarEmprestimo } from "@/actions/actions-emprestimos";
import { createRequestSchemaEmprestimo } from "@/schemas/emprestimo/emprestimoSchema";
import { useState } from "react";

export function FormCadastrarEmprestimo() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      clienteId: Number(formData.get("clienteId")),
      figurinoId: Number(formData.get("figurinoId")),
      quantidade: Number(formData.get("quantidade")),
    };

    const result = createRequestSchemaEmprestimo.safeParse(data);

    //Se tiver algum erro, retorna para o front-end
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors as Record<string, string>);
      return;
    }

    // Chama a action para cadastrar o emprestimo
    const res = await ActionCadastrarEmprestimo(formData);

    if (!res.success) {
      console.log("Erros vindo da API:", res.errors);
      setErrors(res.errors);
      return;
    }

    console.log("Emprestimo cadastrado com sucesso!");
    setErrors({}); // limpa os erros locais;
  }
  // Função para definir a classe do input com base nos erros
  // Se houver erro, adiciona a classe de borda vermelha
  function inputClass(field: string) {
    return `form-control ${errors[field] ? "border border-danger" : ""}`;
  }

  return (
    <form onSubmit={handleSubmit}>
      {/*Id do cliente*/}
      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="clienteId" className="col-sm-1 col-form-label fs-5">
          Cliente:
        </label>
        <div className="col-sm-5">
          <input
            className={inputClass("clienteId")}
            type="number"
            name="clienteId"
            id="clienteId"
            required
          />
          {errors.clienteId && (
            <div className="col-auto">
              <span className="text-danger mt-1">{errors.clienteId}</span>
            </div>
          )}
        </div>
      </div>

      {/*Id do Figurino*/}
      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="figurinoId" className="col-sm-1 col-form-label fs-5">
          Figurino:
        </label>
        <div className="col-sm-5">
          <input
            className={inputClass("figurinoId")}
            type="number"
            name="figurinoId"
            id="figurinoId"
            required
          />
          {errors.figurinoId && (
            <div className="col-auto">
              <span className="text-danger mt-1">{errors.figurinoId}</span>
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
            required
          />
          {errors.quantidade && (
            <div className="col-auto">
              <span className="text-danger mt-1">{errors.quantidade}</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <button type="submit" className="btn btn-secondary">
          Cadastrar Empréstimo
        </button>
      </div>
    </form>
  );
}
