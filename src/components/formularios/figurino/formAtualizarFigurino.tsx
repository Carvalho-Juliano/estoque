"use client";
import { updateRequestSchemaFigurino } from "@/schemas/figurino/figurinoSchema";
import { useState } from "react";
import { ActionUpdateCostume } from "@/actions/actions-figurinos";
import { Costume } from "@/model/Figurino";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface updateCostumeProps {
  costume: Costume;
  id: number;
}

export function UpdateCostumeForm({ costume, id }: updateCostumeProps) {
  //Estado para guardar os erros.Começa vázio ate o usuario preencher o formulario com algum erro.
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      description: formData.get("description") ?? "",
      quantity: Number(formData.get("quantity")) ?? 0,
      size: formData.get("size") ?? "",
      available_quantity: Number(formData.get("available_quantity")) ?? 0,
    };

    const result = updateRequestSchemaFigurino.safeParse(data);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    await ActionUpdateCostume(formData, id);
    window.alert("Figurino atualizado com sucesso!");
    setErrors({});
    router.push("/dashboard/figurino");
  }

  const inputClass = (field: string) =>
    `form-control ${errors[field] ? "border border-danger" : ""}`;

  return (
    <form onSubmit={handleSubmit}>
      {/*Descrição*/}
      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="description" className="col-sm-1 col-form-label fs-5">
          Descrição:
        </label>
        <div className="col-sm-5">
          <input
            className={inputClass("description")}
            type="text"
            name="description"
            id="description"
            defaultValue={costume.description}
            required
          />
          {errors.description?.map((msg, i) => (
            <span key={i} className="text-danger form-text">
              {msg}
            </span>
          ))}
        </div>
      </div>

      {/*Quantidade*/}
      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="quantity" className="col-sm-1 col-form-label fs-5">
          Quantidade:
        </label>
        <div className="col-sm-5">
          <input
            className={inputClass("quantity")}
            type="number"
            name="quantity"
            id="quantity"
            defaultValue={costume.quantity}
            required
          />
          {errors.quantity?.map((msg, i) => (
            <span key={i} className="text-danger form-text">
              {msg}
            </span>
          ))}
        </div>
      </div>

      {/*Tamanho*/}
      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="size" className="col-sm-1 col-form-label fs-5">
          Tamanho:
        </label>
        <div className="col-sm-5">
          <input
            className={inputClass("size")}
            type="text"
            name="size"
            id="size"
            defaultValue={costume.size}
            required
          />
          {errors.size?.map((msg, i) => (
            <span key={i} className="text-danger form-text">
              {msg}
            </span>
          ))}
        </div>
      </div>

      {/*Disponível*/}
      <div className="row g-3 align-items-center mb-3">
        <label
          htmlFor="available_quantity"
          className="col-sm-1 col-form-label fs-5"
        >
          Disponível
        </label>
        <div className="col-sm-5">
          <input
            className={inputClass("available_quantity")}
            type="number"
            name="available_quantity"
            id="available_quantity"
            defaultValue={costume.available_quantity}
            required
          />
          {errors.available_quantity?.map((msg, i) => (
            <span key={i} className="text-danger form-text">
              {msg}
            </span>
          ))}
        </div>
      </div>
      <div>
        <button type="submit" className="btn btn-secondary">
          Atualizar
        </button>
        <Link href={"/dashboard/figurino"} className="btn btn-secondary ms-2">
          Voltar
        </Link>
      </div>
    </form>
  );
}
