"use server";

import { Figurino } from "@/model/Figurino";
import { redirect } from "next/navigation";

export async function ActionCriarFigurino(formData: FormData): Promise<void> {
  const descricao = formData.get("descricao");
  const quantidade = Number(formData.get("quantidade"));
  const tamanho = formData.get("tamanho");
  const disponivel = Number(formData.get("disponivel"));
  if (
    typeof descricao != "string" ||
    isNaN(quantidade) ||
    typeof tamanho != "string" ||
    isNaN(disponivel)
  ) {
    return;
  }

  await Figurino.createFigurino({ descricao, quantidade, tamanho, disponivel });
  redirect("/figurino");
}

export async function ActionAtualizarFigurino(
  formData: FormData,
  id: number
): Promise<void> {
  const descricao = formData.get("descricao");
  const quantidade = Number(formData.get("quantidade"));
  const tamanho = formData.get("tamanho");
  const disponivel = Number(formData.get("disponivel"));
  if (
    typeof descricao != "string" ||
    isNaN(quantidade) ||
    typeof tamanho != "string" ||
    isNaN(disponivel)
  ) {
    return;
  }

  await Figurino.updateFigurino(id, {
    descricao,
    quantidade,
    tamanho,
    disponivel,
  });
  redirect("/figurino");
}

export async function ExcluirFigurino(id: number) {
  await Figurino.delete(id);
}
