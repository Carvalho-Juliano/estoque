"use client";
import styles from "./styles.module.css";
import { DetailedLoan } from "@/model/Emprestimo";
import Link from "next/link";
import { useState } from "react";
import {
  filtrarOrdenarEmprestimo,
  SelectFilters,
} from "@/utils/filtragemTabelas/filtrarOrdenarTabela";
import { Button, Container, FormGroup, Input, Table } from "reactstrap";
import { ActionRemoveLoan } from "@/actions/actions-emprestimos";

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
    <>
      <section className={styles.main}>
        <Container className={styles.tableContainer}>
          <Container className="mb-3 d-flex justify-content-between align-items-center">
            <h2 className={styles.tableTitle}>
              Todos os emprestimos pendentes
            </h2>
            <FormGroup>
              <Input
                type="text"
                placeholder="Filtrar por cliente..."
                value={filter}
                onChange={(ev) => setFilter(ev.target.value)}
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
                  value="quantidade-asc"
                  className={styles.filterSelectOptions}
                >
                  Quantidade Asc
                </option>
                <option
                  value="quantidade-desc"
                  className={styles.filterSelectOptions}
                >
                  Quantidade Desc
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
            <Link href="/dashboard/emprestimo/cadastrar">
              <Button className={styles.linkButton}>
                <i className="bi bi-plus"></i>Cadastrar emprestimo
              </Button>
            </Link>
          </Container>
          <Table dark hover responsive className={styles.customTable}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome do cliente</th>
                <th>Descrição</th>
                <th>Quantidade</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {filteredLoans.map((loan) => (
                <tr key={loan.id} className={styles.tableRow}>
                  <td>{loan.id}</td>
                  <td>{loan.clientName}</td>
                  <td>{loan.costumeDescription}</td>
                  <td>{loan.quantity}</td>
                  <td>
                    <Link href={`/dashboard/emprestimo/${loan.id}`}>
                      <Button className={styles.linkBtn}>Ver Detalhes</Button>
                    </Link>
                    <Button
                      type="button"
                      className={styles.removeBtn}
                      onClick={() => ActionRemoveLoan(loan.id)}
                    >
                      Excluir
                    </Button>
                  </td>
                  {/* <td>
                    <Link href={}>Atualizar</Link>
                  </td>*/}
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </section>
    </>
  );
}
