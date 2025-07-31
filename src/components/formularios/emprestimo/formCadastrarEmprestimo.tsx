"use client";

import { ActionRegisterLoan } from "@/actions/actions-emprestimos";
import { useState } from "react";

export function FormCadastrarEmprestimo() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [clientId, setClientId] = useState("");
  const [costumeId, setCostumeId] = useState("");
  const [quantity, setQuantity] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const clientId = Number(formData.get("clientId"));
    const costumeId = Number(formData.get("costumeId"));
    const quantity = Number(formData.get("quantity"));
    const body = {
      clientId,
      costumeId,
      quantity,
    };

    const response = await ActionRegisterLoan({ body });

    if (response && !response.success) {
      setErrors(response.errors);
      return;
    }

    window.alert("Emprestimo cadastrado com sucesso!");
    setErrors({});
    setClientId("");
    setCostumeId("");
    setQuantity("");
  }

  function inputClass(field: string) {
    return `form-control ${errors[field] ? "border border-danger" : ""}`;
  }

  return (
    <form onSubmit={handleSubmit}>
      {/*Id do cliente*/}
      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="clientId" className="col-sm-1 col-form-label fs-5">
          CLIENTE:
        </label>
        <div className="col-sm-5">
          <input
            className={inputClass("clientId")}
            type="number"
            name="clientId"
            id="clientId"
            value={clientId}
            onChange={(event) => setClientId(event.target.value)}
            required
          />
          {errors.clientId && (
            <div className="col-auto">
              <span className="text-danger form-text">{errors.clientId}</span>
            </div>
          )}
        </div>
      </div>

      {/*Id do Figurino*/}
      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="costumeId" className="col-sm-1 col-form-label fs-5">
          FIGURINO:
        </label>
        <div className="col-sm-5">
          <input
            className={inputClass("costumeId")}
            type="number"
            name="costumeId"
            id="costumeId"
            value={costumeId}
            onChange={(event) => setCostumeId(event.target.value)}
            required
          />
          {errors.costumeId && (
            <div className="col-auto">
              <span className="text-danger form-text">{errors.costumeId}</span>
            </div>
          )}
        </div>
      </div>

      {/*Quantidade*/}
      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="quantity" className="col-sm-1 col-form-label fs-5">
          QUANTIDADE:
        </label>
        <div className="col-sm-5">
          <input
            className={inputClass("quantity")}
            type="number"
            name="quantity"
            id="quantity"
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            required
          />
          {errors.quantity && (
            <div className="col-auto">
              <span className="text-danger form-text">{errors.quantity}</span>
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
