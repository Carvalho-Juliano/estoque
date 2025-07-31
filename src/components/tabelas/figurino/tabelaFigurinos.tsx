"use client";
import { Costume } from "@/model/Figurino";
import Link from "next/link";
import {
  filtrarOrdenarTabela,
  SelectFilters,
} from "@/utils/filtragemTabelas/filtrarOrdenarTabela";
import { useState } from "react";
import RequireAuth from "@/components/requireAuth/requireAuth";
import { Button } from "reactstrap";
import { deleteCostume } from "@/actions/actions-figurinos";

interface TabelaFigurinosProps {
  costumes: Costume[];
}

export default function CostumesTable({ costumes }: TabelaFigurinosProps) {
  const [filter, setFilter] = useState("");
  const [filterOrder, setFilterOrder] = useState<SelectFilters>("default");

  //chamado da função para aplicar a filtragem nas tabelas
  const filteredCostumes = filtrarOrdenarTabela(costumes, {
    description: filter,
    order: filterOrder,
  });

  return (
    //tentativa de implementar autenticação nas rotas/paginas.
    <RequireAuth>
      <section className="container mb-5 mt-5">
        <div className="container mb-3 d-flex justify-content-between align-items-center">
          <h2>Todos figurinos cadastrados</h2>
          <input
            type="text"
            placeholder="Filtrar por descrição..."
            value={filter}
            onChange={(ev) => setFilter(ev.target.value)}
            className="form-control w-auto"
          />
          <select
            name="filter"
            id="filter"
            value={filterOrder}
            onChange={(ev) => setFilterOrder(ev.target.value as SelectFilters)}
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
          <Link
            className="btn btn-secondary"
            href="/dashboard/figurino/cadastrar"
          >
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
              {filteredCostumes.map((costume) => (
                <tr key={costume.id}>
                  <td>{costume.id}</td>
                  <td>{costume.description}</td>
                  <td>{costume.quantity}</td>
                  <td>
                    <Link
                      className="btn btn-primary"
                      href={`/dashboard/figurino/${costume.id}`}
                    >
                      Ver detalhes
                    </Link>
                    <Link
                      className="btn btn-secondary ms-2"
                      href={`/dashboard/figurino/${costume.id}/atualizar`}
                    >
                      Atualizar
                    </Link>
                    <Button
                      type="button"
                      className="btn btn-danger ms-2"
                      onClick={async () => {
                        const result = await deleteCostume(costume.id);
                        if (!result?.success) {
                          window.alert(result?.message);
                          return;
                        }
                      }}
                    >
                      EXCLUIR
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </RequireAuth>
  );
}
