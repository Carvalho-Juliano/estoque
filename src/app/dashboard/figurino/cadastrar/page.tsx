"use client";
import { FormRegisterCostume } from "@/components/formularios/figurino/formCadastrarFigurino";

export default function CadastrarFigurino() {
  return (
    <main className="container mb-5 mt-5">
      <h2 style={{ color: "#03c04a" }}>Cadastrar um novo figurino</h2>
      <FormRegisterCostume />
    </main>
  );
}
