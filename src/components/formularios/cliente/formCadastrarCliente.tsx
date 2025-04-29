import { ActionCadastrarCliente } from "@/actions/actions-clientes";

export function FormCadastrarCliente() {
  return (
    <form action={ActionCadastrarCliente}>
      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="nome" className="col-sm-1 col-form-label fs-5">
          Nome:
        </label>
        <div className="col-sm-5">
          <input
            className="form-control"
            type="text"
            name="nome"
            id="nome"
            required
          />
        </div>
      </div>

      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="telefone" className="col-sm-1 col-form-label fs-5">
          Telefone:
        </label>
        <div className="col-sm-5">
          <input
            className="form-control"
            type="tel"
            name="telefone"
            id="telefone"
            required
          />
        </div>
      </div>

      <div className="row g-3 align-items-center mb-3">
        <label htmlFor="email" className="col-sm-1 col-form-label fs-5">
          Email:
        </label>
        <div className="col-sm-5">
          <input
            className="form-control"
            type="tel"
            name="email"
            id="email"
            placeholder="johnDoe@email.com"
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
