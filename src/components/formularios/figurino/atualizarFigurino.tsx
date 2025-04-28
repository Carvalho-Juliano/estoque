import { ActionAtualizarFigurino } from "@/actions/actions-figurinos";
import { Figurino } from "@/model/Figurino";

export default function FormAtualizarFigurino(
  { figurino }: { figurino: Figurino },
  { id }: { id: number }
) {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await ActionAtualizarFigurino(formData, id);
    console.log("Figurino atualizado com sucesso!");
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="descricao">Descrição:</label>
        <input
          type="text"
          name="descricao"
          id="descricao"
          defaultValue={figurino.descricao}
          required
        />
      </div>

      <div>
        <label htmlFor="quantidade">Quantidade:</label>
        <input
          type="number"
          name="quantidade"
          id="quantidade"
          defaultValue={figurino.quantidade}
          required
        />
      </div>

      <div>
        <label htmlFor="tamanho">Tamanho:</label>
        <input
          type="text"
          name="tamanho"
          id="tamanho"
          defaultValue={figurino.tamanho}
          required
        />
      </div>

      <div>
        <label htmlFor="disponivel">Disponível</label>
        <input
          type="text"
          name="disponivel"
          id="disponivel"
          defaultValue={figurino.disponivel}
          required
        />
      </div>

      <div>
        <button type="submit">Atualizar</button>
      </div>
    </form>
  );
}
