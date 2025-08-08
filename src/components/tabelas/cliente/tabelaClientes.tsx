"use client";
import { Client } from "@/model/Cliente";
import styles from "./styles.module.css";
import Link from "next/link";
import { useState } from "react";
import filtrarOrdenarClientes, {
  SelectFilters,
} from "@/utils/filtragemTabelas/filtrarOrdenarTabela";
import { Button, Container, FormGroup, Input, Table } from "reactstrap";
import { ActionRemoveClient } from "@/actions/actions-clientes";

interface ClientTableProps {
  clients: Client[];
}

export default function ClientTable({ clients }: ClientTableProps) {
  const [filter, setFiltro] = useState("");
  const [orderFilter, setOrderFilter] = useState<SelectFilters>("default");

  const clientesFiltrados = filtrarOrdenarClientes(clients, {
    clientName: filter,
    order: orderFilter,
  });

  return (
    <>
      <section className={styles.main}>
        <Container className={styles.tableContainer}>
          <Container className="mb-3 d-flex justify-content-between align-items-center">
            <h2 className={styles.tableTitle}>Todos os clientes cadastrados</h2>
            <FormGroup>
              <Input
                type="text"
                placeholder="Filtrar por nome..."
                value={filter}
                onChange={(ev) => setFiltro(ev.target.value)}
                className={styles.filterInput}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="select"
                name="filter"
                id="filter"
                value={orderFilter}
                onChange={(ev) =>
                  setOrderFilter(ev.target.value as SelectFilters)
                }
                className={styles.filterSelect}
              >
                <option value="default" disabled hidden>
                  Selecione um filtro
                </option>
                <option
                  value="dataRecente"
                  className={styles.filterSelectOptions}
                >
                  Mais recentes
                </option>
                <option
                  value="dataAntigo"
                  className={styles.filterSelectOptions}
                >
                  Mais antigos
                </option>
              </Input>
            </FormGroup>
            <Link href="/dashboard/cliente/cadastrar">
              <Button className={styles.linkButton}>
                <i className="bi bi-plus"></i>Cadastrar novo cliente
              </Button>
            </Link>
          </Container>
          <Table dark hover responsive className={styles.customTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {clientesFiltrados.map((client) => (
                <tr key={client.id} className={styles.tableRow}>
                  <td>{client.id}</td>
                  <td>{client.name}</td>
                  <td>{client.phone}</td>
                  <td>
                    <Link href={`/dashboard/cliente/${client.id}`}>
                      <Button className={styles.linkBtn}>Ver Detalhes</Button>
                    </Link>
                    <Link href={`/dashboard/cliente/${client.id}/atualizar`}>
                      <Button className={styles.linkBtn}>Atualizar</Button>
                    </Link>
                    <Button
                      type="button"
                      className={styles.removeBtn}
                      onClick={async () => {
                        const result = await ActionRemoveClient(client.id);
                        console.log(result);
                        if (!result?.success) {
                          window.alert(result.errors._global);
                          return;
                        }
                      }}
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </section>
    </>
  );
}
