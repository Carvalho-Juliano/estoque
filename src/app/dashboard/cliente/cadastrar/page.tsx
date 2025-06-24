import { FormCadastrarCliente } from "@/components/formularios/cliente/formCadastrarCliente";

export default function CadastrarCliente() {
  return (
    <main className="container mb-5 mt-5">
      <h2 className="mb-3">Cadastrar novo cliente</h2>
      <FormCadastrarCliente />
    </main>
  );
}
