"use client";
import { ActionCadastrarCliente } from "@/actions/actions-clientes";
import { createRequestSchemaCliente } from "@/schemas/cliente/clienteSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function FormCadastrarCliente() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      nome: formData.get("nome"),
      telefone: formData.get("telefone"),
      email: formData.get("email"),
    };

    const result = createRequestSchemaCliente.safeParse(data);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors as Record<string, string>);
      return;
    }

    const response = await ActionCadastrarCliente(formData);

    if (response && !response.success) {
      setErrors(response.errors);
      return;
    }

    window.alert("Figurino cadastrado com sucesso!");
    setErrors({});
    router.push("/dashboard/cliente");
  }

  const inputClass = (field: string) =>
    `form-control ${errors[field] ? "border border-danger" : ""}`;

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="nome" className="col-sm-1 col-form-label fs-5">
          Nome:
        </label>
        <div className="col-sm-5">
          <input
            className={inputClass("nome")}
            type="text"
            name="nome"
            id="nome"
            required
          />
          {errors.nome && (
            <div className="col-auto">
              <span className="text-danger form-text">{errors.nome}</span>
            </div>
          )}
        </div>
      </div>

      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="telefone" className="col-sm-1 col-form-label fs-5">
          Telefone:
        </label>
        <div className="col-sm-5">
          <input
            className={inputClass("telefone")}
            type="tel"
            name="telefone"
            id="telefone"
            required
          />
          {errors.telefone && (
            <div className="col-auto">
              <span className="text-danger form-text">{errors.telefone}</span>
            </div>
          )}
        </div>
      </div>

      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="email" className="col-sm-1 col-form-label fs-5">
          Email:
        </label>
        <div className="col-sm-5">
          <input
            className={inputClass("email")}
            type="email"
            name="email"
            id="email"
            placeholder="johnDoe@email.com"
          />
          {errors.email && (
            <div className="col-auto">
              <span className="text-danger form-text">{errors.email}</span>
            </div>
          )}
        </div>
      </div>

      <div>
        <button type="submit" className="btn btn-secondary">
          Enviar
        </button>
        <Link href={"/dashboard/cliente"} className="btn btn-secondary ms-2">
          Voltar
        </Link>
      </div>
    </form>
  );
}
