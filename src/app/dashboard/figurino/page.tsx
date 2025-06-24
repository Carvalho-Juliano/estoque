import TabelaFigurinos from "@/components/tabelas/figurino/tabelaFigurinos";
import { Figurino } from "@/model/Figurino";

export default async function Figurinos() {
  const figurinos = await Figurino.findAll();

  return (
    <main>
      <TabelaFigurinos figurinos={figurinos} />
    </main>
  );
}
