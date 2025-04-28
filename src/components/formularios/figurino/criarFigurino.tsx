import { ActionCriarFigurino } from "@/actions/actions-figurinos";

export function FormCriarFigurino() {
  return (
    <form action={ActionCriarFigurino}>
      <div>
        <label htmlFor="descricao">Descrição:</label>
        <input type="text" name="descricao" id="descricao" required />
      </div>

      <div>
        <label htmlFor="quantidade">Quantidade:</label>
        <input type="number" name="quantidade" id="quantidade" required />
      </div>

      <div>
        <label htmlFor="tamanho">Tamanho:</label>
        <input type="text" name="tamanho" id="tamanho" required />
      </div>

      <div>
        <label htmlFor="disponivel">Disponível</label>
        <input type="text" name="disponivel" id="disponivel" required />
      </div>

      <div>
        <button type="submit">Enviar</button>
      </div>
    </form>
  );
}
