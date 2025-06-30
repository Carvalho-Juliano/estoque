"use client";
import { EmprestimoDetalhado } from "@/model/Emprestimo";
import Link from "next/link";
import ButtonDeletarEmprestimo from "@/components/botoes/emprestimo/deleteEmprestimoButton";
import { useState } from "react";
import {
  filtrarOrdenarEmprestimo,
  SelectFilters,
} from "@/utils/filtragemTabelas/filtrarOrdenarTabela";
import RequireAuth from "@/components/requireAuth/requireAuth";

interface TabelaEmprestimosProps {
  emprestimos: EmprestimoDetalhado[];
}

export default function TabelaEmprestimos({
  emprestimos,
}: TabelaEmprestimosProps) {
  const [filtro, setFiltro] = useState("");
  const [filtroOrdem, setFiltroOrdem] = useState<SelectFilters>("default");

  const emprestimosFiltrados = filtrarOrdenarEmprestimo(emprestimos, {
    clienteNome: filtro,
    ordem: filtroOrdem,
  });

  return (
    <RequireAuth>
      <section className="container mb-5 mt-5">
        <div className="container mb-3 d-flex justify-content-between align-items-center">
          <h2 className="mb-3">Todos os emprestimos</h2>
          <input
            type="text"
            placeholder="Filtrar por cliente..."
            value={filtro}
            onChange={(ev) => setFiltro(ev.target.value)}
            className="form-control w-auto"
          />
          <select
            name="filter"
            id="filter"
            value={filtroOrdem}
            onChange={(ev) => setFiltroOrdem(ev.target.value as SelectFilters)}
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
          <Link className="btn btn-secondary" href="/emprestimo/cadastrar">
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
              {emprestimosFiltrados.map((emprestimo) => (
                <tr key={emprestimo.id}>
                  <td>{emprestimo.id}</td>
                  <td>{emprestimo.clienteNome}</td>
                  <td>{emprestimo.figurinoDescricao}</td>
                  <td>{emprestimo.quantidade}</td>
                  <td>
                    <Link
                      className="btn btn-primary"
                      href={`/dashboard/emprestimo/${emprestimo.id}`}
                    >
                      Ver Detalhes
                    </Link>
                    <ButtonDeletarEmprestimo id={emprestimo.id} />
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
