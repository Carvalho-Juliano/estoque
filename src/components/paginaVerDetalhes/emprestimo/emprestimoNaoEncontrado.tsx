import Link from "next/link";

export default function EmprestimoNaoEncontrado() {
  return (
    <main>
      <section className="container mt-5">
        <div className="card border-danger">
          <div className="card-header">
            <h2>Emprestimo não encontrado!</h2>
            <div className="card-body fs-5">
              <p>
                O emprestimo requisitado nao foi encontrado no nosso banco de
                dados.
              </p>
              <Link href={`/emprestimo`} className="btn btn-secondary">
                <i className="bi bi-reply-fill"></i> Voltar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
