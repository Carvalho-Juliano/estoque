import { FormCadastrarEmprestimo } from "@/components/formularios/emprestimo/formCadastrarEmprestimo";

export default function CadastrarEmprestimo() {
  return (
    <main className="container mb-5 mt-5">
      <h2 className="mb-3">Cadastrar novo emprestimo</h2>
      <FormCadastrarEmprestimo />
    </main>
  );
}
