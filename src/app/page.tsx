import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Bem vindo ao sistema de estoque para figurinos!</h1>
      <p>Faça login para utilizar o painel de administração do estoque.</p>
      <Link href={"/login"}>Logar</Link>
    </main>
  );
}
