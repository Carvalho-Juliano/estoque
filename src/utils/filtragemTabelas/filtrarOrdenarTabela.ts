import dayjs from "dayjs";

export type SelectFilters =
  | "default"
  | "quantidade-asc"
  | "quantidade-desc"
  | "dataRecente"
  | "dataAntigo";

interface filtrosTabelaFigurinos {
  description?: string;
  order?: SelectFilters;
}

interface filstrosTabelaEmprestimos {
  clientName?: string;
  order?: SelectFilters;
}

//Função para filtragem de dados na tabela figurinos
export function filterAndOrderTable<
  T extends { description: string; quantity: number; createdAt: string | Date }
>(dados: T[], filtros: filtrosTabelaFigurinos): T[] {
  let resultado = dados;

  //flitragem por descrição
  if (filtros.description) {
    resultado = resultado.filter((item) =>
      item.description
        .toLowerCase()
        .includes(filtros.description!.toLowerCase())
    );
  }

  //Ordenação por data e quantidade
  switch (filtros.order) {
    case "quantidade-asc":
      resultado = [...resultado].sort((a, b) => a.quantity - b.quantity);
      break;
    case "quantidade-desc":
      resultado = [...resultado].sort((a, b) => b.quantity - a.quantity);
      break;
    case "dataRecente":
      resultado = [...resultado].sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
      break;
    case "dataAntigo":
      resultado = [...resultado].sort(
        (a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
      );
      break;
    default:
      break;
  }

  return resultado;
}

//Função para filtragem de dados na tabela emprestimos
export function filterAndOrderLoansTable<
  T extends {
    clientName: string;
    quantity: number;
    createdAt: string | Date;
  }
>(dados: T[], filtros: filstrosTabelaEmprestimos): T[] {
  let resultado = dados;

  //filtrar por nome cliente
  if (filtros.clientName) {
    resultado = resultado.filter((emprestimo) =>
      emprestimo.clientName
        .toLowerCase()
        .includes(filtros.clientName!.toLowerCase())
    );
  }

  //Ordenação por data e quantidade
  switch (filtros.order) {
    case "quantidade-asc":
      resultado = [...resultado].sort((a, b) => a.quantity - b.quantity);
      break;
    case "quantidade-desc":
      resultado = [...resultado].sort((a, b) => b.quantity - a.quantity);
      break;
    case "dataRecente":
      resultado = [...resultado].sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
      break;
    case "dataAntigo":
      resultado = [...resultado].sort(
        (a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
      );
      break;
    default:
      break;
  }

  return resultado;
}

//Função para filtragem de dados na tabela clientes.
//Foi usado o filtrosTabelaEmprestimo pois tem os mesmos valores necessarios para a filtragem da tabela clientes.
export default function filterAndOrderClientsTable<
  T extends { name: string; createdAt: string | Date }
>(dados: T[], filtros: filstrosTabelaEmprestimos): T[] {
  let resultado = dados;

  if (filtros.clientName) {
    resultado = resultado.filter((cliente) =>
      cliente.name.toLowerCase().includes(filtros.clientName!.toLowerCase())
    );
  }
  switch (filtros.order) {
    case "dataRecente":
      resultado = [...resultado].sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );
      break;
    case "dataAntigo":
      resultado = [...resultado].sort(
        (a, b) => dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
      );
      break;
    default:
      break;
  }
  return resultado;
}
