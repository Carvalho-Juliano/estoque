"use client";
import { Figurino } from "@/model/Figurino";
import Link from "next/link";
import { SelectFilters } from "@/types/filterTypes";
import ButtonDeletarFigurino from "@/components/botoes/figurino/deleteFigurinoButton";
import { useEffect, useState } from "react";

interface TabelaFigurinosProps {
  figurinos: Figurino[];
}

export default function TabelaFigurinos({ figurinos }: TabelaFigurinosProps) {
  const [filtro, setFiltro] = useState("");
  const [filtroOrdem, setfiltroOrdem] = useState<SelectFilters>("default");
  const [figurinosFiltrados, setFigurinosFiltrados] =
    useState<Figurino[]>(figurinos);

  useEffect(() => {
    let resultado = figurinos.filter((figurino) =>
      figurino.descricao.toLowerCase().includes(filtro.toLowerCase())
    );

    if (filtroOrdem === "quantidade-asc") {
      resultado = [...resultado].sort((a, b) => a.quantidade - b.quantidade);
    } else if (filtroOrdem === "quantidade-desc") {
      resultado = [...resultado].sort((a, b) => b.quantidade - a.quantidade);
    } else if (filtroOrdem === "dataRecente") {
      resultado = [...resultado].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (filtroOrdem === "dataAntigo") {
      resultado = [...resultado].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    setFigurinosFiltrados(resultado);
  }, [filtro, filtroOrdem, figurinos]);

  return (
    <section className="container mb-5 mt-5">
      <div className="container mb-3 d-flex justify-content-between align-items-center">
        <h2>Todos figurinos cadastrados</h2>
        <input
          type="text"
          placeholder="Filtrar por descrição..."
          value={filtro}
          onChange={(ev) => setFiltro(ev.target.value)}
          className="form-control w-auto"
        />
        <select
          name="filter"
          id="filter"
          value={filtroOrdem}
          onChange={(ev) => setfiltroOrdem(ev.target.value as SelectFilters)}
          className="form-select w-auto"
        >
          <option value="default" disabled hidden>
            Selecione um filtro
          </option>
          <option value="quantidade-asc">Quantidade Asc</option>
          <option value="quantidade-desc">Quantidade Desc</option>
          <option value="dataRecente">Mais recentes</option>
          <option value="dataAntigo">Mais antigos</option>
        </select>
        <Link className="btn btn-secondary" href="/figurino/cadastrar">
          <i className="bi bi-plus"></i>Cadastrar novo figurino
        </Link>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-secondary">
            <tr>
              <th>Id</th>
              <th>Descrição</th>
              <th>Quantiade</th>
              <th>Opçoes</th>
            </tr>
          </thead>
          <tbody>
            {figurinosFiltrados.map((figurino) => (
              <tr key={figurino.id}>
                <td>{figurino.id}</td>
                <td>{figurino.descricao}</td>
                <td>{figurino.quantidade}</td>
                <td>
                  <Link
                    className="btn btn-primary"
                    href={`/figurino/${figurino.id}`}
                  >
                    Ver detalhes
                  </Link>
                  <Link
                    className="btn btn-secondary ms-2"
                    href={`/figurino/${figurino.id}/atualizar`}
                  >
                    Atualizar
                  </Link>
                  <ButtonDeletarFigurino id={figurino.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
