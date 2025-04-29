import { ActionCriarFigurino } from "@/actions/actions-figurinos";

export function FormCriarFigurino() {
  return (
    <form action={ActionCriarFigurino}>
      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="descricao" className="col-sm-1 col-form-label fs-5">
          Descrição:
        </label>
        <div className="col-sm-5">
          <input
            className="form-control"
            type="text"
            name="descricao"
            id="descricao"
            required
          />
        </div>
      </div>

      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="quantidade" className="col-sm-1 col-form-label fs-5">
          Quantidade:
        </label>
        <div className="col-sm-5">
          <input
            className="form-control"
            type="number"
            name="quantidade"
            id="quantidade"
            required
          />
        </div>
      </div>

      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="tamanho" className="col-sm-1 col-form-label fs-5">
          Tamanho:
        </label>
        <div className="col-sm-5">
          <input
            className="form-control"
            type="text"
            name="tamanho"
            id="tamanho"
            required
          />
        </div>
      </div>

      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="disponivel" className="col-sm-1 col-form-label fs-5">
          Disponível
        </label>
        <div className="col-sm-5">
          <input
            className="form-control"
            type="text"
            name="disponivel"
            id="disponivel"
            required
          />
        </div>
      </div>

      <div>
        <button type="submit" className="btn btn-secondary">
          Enviar
        </button>
      </div>
    </form>
  );
}
