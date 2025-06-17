export type SelectFilters =
  | "default"
  | "quantidade-asc"
  | "quantidade-desc"
  | "dataRecente"
  | "dataAntigo";

interface filtrosTabela {
  descricao?: string;
  ordem?: SelectFilters;
}

//Função generica criada para nao precisar repetir código ao aplicar filtragem nas tabelas
export function filtrarOrdenarTabela<
  T extends { descricao: string; quantidade: number; createdAt: string | Date }
>(dados: T[], filtros: filtrosTabela): T[] {
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
