"use client";
import { Cliente } from "@/model/Cliente";
import Link from "next/link";
import ButtonDeletarCliente from "@/components/botoes/cliente/deleteClienteButton";
import { useState } from "react";
import filtrarOrdenarClientes, {
  SelectFilters,
} from "@/funcoes/filtragemTabelas/filtrarOrdenarTabela";
import RequireAuth from "@/components/requireAuth/requireAuth";

interface TabelaClientesProps {
  clientes: Cliente[];
}

export default function TabelaClientes({ clientes }: TabelaClientesProps) {
  const [filtro, setFiltro] = useState("");
  const [filtroOrdem, setfiltroOrdem] = useState<SelectFilters>("default");

  const clientesFiltrados = filtrarOrdenarClientes(clientes, {
    clienteNome: filtro,
    ordem: filtroOrdem,
  });

  return (
    <RequireAuth>
      <section className="container mb-5 mt-5">
        <div className="container mb-3 d-flex justify-content-between align-items-center">
          <h2>Todos os clientes cadastrados</h2>
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
            <option value="dataRecente">Mais recentes</option>
            <option value="dataAntigo">Mais antigos</option>
          </select>
          <Link className="btn btn-secondary" href="/cliente/cadastrar">
            <i className="bi bi-plus"></i>Cadastrar novo cliente
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead className="table-secondary">
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.telefone}</td>
                  <td>
                    <Link
                      className="btn btn-primary"
                      href={`/dashboard/cliente/${cliente.id}`}
                    >
                      Ver detalhes
                    </Link>
                    <Link
                      className="btn btn-secondary ms-2"
                      href={`/dashboard/cliente/${cliente.id}/atualizar`}
                    >
                      Atualizar
                    </Link>
                    <ButtonDeletarCliente id={cliente.id} />
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
