"use client";
import { DetailedLoan } from "@/model/Emprestimo";
import Link from "next/link";
import ButtonDeletarEmprestimo from "@/components/botoes/emprestimo/deleteEmprestimoButton";
import { useState } from "react";
import {
  filtrarOrdenarEmprestimo,
  SelectFilters,
} from "@/utils/filtragemTabelas/filtrarOrdenarTabela";
import RequireAuth from "@/components/requireAuth/requireAuth";

interface LoansTableProps {
  loans: DetailedLoan[];
}

export default function LoansTable({ loans }: LoansTableProps) {
  const [filter, setFilter] = useState("");
  const [orderFilter, setOrderFilter] = useState<SelectFilters>("default");

  const filteredLoans = filtrarOrdenarEmprestimo(loans, {
    clientName: filter,
    order: orderFilter,
  });

  return (
    <RequireAuth>
      <section className="container mb-5 mt-5">
        <div className="container mb-3 d-flex justify-content-between align-items-center">
          <h2 className="mb-3">Todos os emprestimos pendentes</h2>
          <input
            type="text"
            placeholder="Filtrar por cliente..."
            value={filter}
            onChange={(ev) => setFilter(ev.target.value)}
            className="form-control w-auto"
          />
          <select
            name="filter"
            id="filter"
            value={orderFilter}
            onChange={(ev) => setOrderFilter(ev.target.value as SelectFilters)}
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
            href="/dashboard/emprestimo/cadastrar"
          >
            <i className="bi bi-plus"></i>Cadastrar novo emprestimo
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-secondary">
              <tr>
                <th>Id</th>
                <th>Nome do cliente</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.id}</td>
                  <td>{loan.clientName}</td>
                  <td>{loan.costumeDescription}</td>
                  <td>{loan.quantity}</td>
                  <td>
                    <Link
                      className="btn btn-primary"
                      href={`/dashboard/emprestimo/${loan.id}`}
                    >
                      Ver Detalhes
                    </Link>
                    <ButtonDeletarEmprestimo id={loan.id} />
                  </td>
                  {/* <td>
                    <Link href={}>Atualizar</Link>
                  </td>*/}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </RequireAuth>
  );
}
