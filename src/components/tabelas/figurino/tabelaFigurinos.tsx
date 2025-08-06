"use client";
import styles from "./styles.module.css";
import { Costume } from "@/model/Figurino";
import Link from "next/link";
import {
  filtrarOrdenarTabela,
  SelectFilters,
} from "@/utils/filtragemTabelas/filtrarOrdenarTabela";
import { useState } from "react";
import { Button, Container, FormGroup, Input, Table } from "reactstrap";
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
    <Container className={styles.tableContainer}>
      <Container className="mb-3 d-flex justify-content-between align-items-center">
        <h2 className={styles.tableTitle}>Todos figurinos cadastrados</h2>
        <FormGroup>
          <Input
            type="text"
            placeholder="Filtrar por descrição..."
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
            value={filterOrder}
            onChange={(ev) => setFilterOrder(ev.target.value as SelectFilters)}
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
            <option value="dataRecente" className={styles.filterSelectOptions}>
              Mais recentes
            </option>
            <option value="dataAntigo" className={styles.filterSelectOptions}>
              Mais antigos
            </option>
          </Input>
        </FormGroup>
        <Link href="/dashboard/figurino/cadastrar">
          <Button className={styles.linkButton}>
            <i className="bi bi-plus"></i>Cadastrar novo figurino
          </Button>
        </Link>
      </Container>
      <Table dark hover responsive className={styles.customTable}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Descrição</th>
            <th>Quantiade</th>
            <th>Opçoes</th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {filteredCostumes.map((costume) => (
            <tr key={costume.id} className={styles.tableRow}>
              <td>{costume.id}</td>
              <td>{costume.description}</td>
              <td>{costume.quantity}</td>
              <td>
                <Link href={`/dashboard/figurino/${costume.id}`}>
                  <Button className={styles.linkBtn}>Ver detalhes</Button>
                </Link>
                <Link href={`/dashboard/figurino/${costume.id}/atualizar`}>
                  <Button className={styles.linkBtn}>Atualizar</Button>
                </Link>
                <Button
                  type="button"
                  className={styles.removeBtn}
                  onClick={async () => {
                    const result = await deleteCostume(costume.id);
                    if (!result?.success) {
                      window.alert(result?.message);
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
  );
}
