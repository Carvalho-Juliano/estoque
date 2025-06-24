"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setErro("");

    const response = await signIn("credentials", {
      redirect: false,
      email,
      senha,
      callbackUrl: "/dashboard", //coloquei explicitamente o callback pois estava caindo em undefined
    });

    if (response?.error) {
      setErro(response.error);
      return;
    }

    //caso login bem-sucedido redireciona para a pagina do dashboard
    router.push(response?.url || "/dashboard");
  }

  return (
    <main className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={senha}
            onChange={(ev) => setSenha(ev.target.value)}
            required
          />
        </div>
        {erro && <div className="text-danger">{erro}</div>}
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}
