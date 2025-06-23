export type SelectFilters =
  | "default"
  | "quantidade-asc"
  | "quantidade-desc"
  | "dataRecente"
  | "dataAntigo";

interface filtrosTabelaFigurinos {
  descricao?: string;
  ordem?: SelectFilters;
}

interface filstrosTabelaEmprestimos {
  clienteNome?: string;
  ordem?: SelectFilters;
}

//Função para filtragem de dados na tabela figurinos
export function filtrarOrdenarTabela<
  T extends { descricao: string; quantidade: number; createdAt: string | Date }
>(dados: T[], filtros: filtrosTabelaFigurinos): T[] {
  let resultado = dados;

  //flitragem por descrição
  if (filtros.descricao) {
    resultado = resultado.filter((item) =>
      item.descricao.toLowerCase().includes(filtros.descricao!.toLowerCase())
    );
  }

  //Ordenação por data e quantidade
  switch (filtros.ordem) {
    case "quantidade-asc":
      resultado = [...resultado].sort((a, b) => a.quantidade - b.quantidade);
      break;
    case "quantidade-desc":
      resultado = [...resultado].sort((a, b) => b.quantidade - a.quantidade);
      break;
    case "dataRecente":
      resultado = [...resultado].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case "dataAntigo":
      resultado = [...resultado].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      break;
    default:
      break;
  }

  return resultado;
}

//Função para filtragem de dados na tabela emprestimos
export function filtrarOrdenarEmprestimo<
  T extends {
    clienteNome: string;
    quantidade: number;
    createdAt: string | Date;
  }
>(dados: T[], filtros: filstrosTabelaEmprestimos): T[] {
  let resultado = dados;

  //filtrar por nome cliente
  if (filtros.clienteNome) {
    resultado = resultado.filter((emprestimo) =>
      emprestimo.clienteNome
        .toLowerCase()
        .includes(filtros.clienteNome!.toLowerCase())
    );
  }

  //Ordenação por data e quantidade
  switch (filtros.ordem) {
    case "quantidade-asc":
      resultado = [...resultado].sort((a, b) => a.quantidade - b.quantidade);
      break;
    case "quantidade-desc":
      resultado = [...resultado].sort((a, b) => b.quantidade - a.quantidade);
      break;
    case "dataRecente":
      resultado = [...resultado].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
    case "dataAntigo":
      resultado = [...resultado].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
      break;
    default:
      break;
  }

  return resultado;
}

//Função para filtragem de dados na tabela clientes.
//Foi usado o filtrosTabelaEmprestimo pois tem os mesmos valores necessarios para a filtragem da tabela clientes.
export default function filtrarOrdenarClientes<
  T extends { nome: string; createdAt: string | Date }
>(dados: T[], filtros: filstrosTabelaEmprestimos): T[] {
  let resultado = dados;

  if (filtros.clienteNome) {
    resultado = resultado.filter((cliente) =>
      cliente.nome.toLowerCase().includes(filtros.clienteNome!.toLowerCase())
    );
  }
    switch (filtros.ordem) {
      case "dataRecente":
        resultado = [...resultado].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "dataAntigo":
        resultado = [...resultado].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      default:
        break;
    }
    return resultado;
  }

  
