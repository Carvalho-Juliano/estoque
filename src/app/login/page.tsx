"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import styles from "./styles.module.css";

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

    if (!response) return null;

    if (response.error) {
      const errorMessage =
        response.error === "CredentialsSignin"
          ? "Email ou senha incorretos"
          : "Erro ao fazer login";
      setErro(errorMessage);
      return;
    }

    //caso login bem-sucedido redireciona para a pagina do dashboard
    router.push(response.url || "/dashboard");
  }

  return (
    <main>
      <section className="vh-100" style={{ backgroundColor: "#212529" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-md-5 mt-md-4 pb-5">
                      <h2 className="fw-bold mb-2">Bem vindo!</h2>
                      <p className="text-light-50 mb-5">
                        Insira Email e Senha para acessar o dashboard
                      </p>
                      <div className="form-floating form-white mb-4">
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          value={email}
                          placeholder="name@example.com"
                          required
                          onChange={(ev) => setEmail(ev.target.value)}
                        />
                        <label className="form-label">Email</label>
                      </div>
                      <div className="form-floating form-white mb-4">
                        <input
                          type="password"
                          className="form-control form-control-lg"
                          value={senha}
                          placeholder="********"
                          required
                          onChange={(ev) => setSenha(ev.target.value)}
                        />
                        <label className="form-label">Senha</label>
                      </div>

                      {erro && (
                        <div className={styles.errorMessage}>{erro}</div>
                      )}

                      <button
                        type="submit"
                        className="btn btn-outline-light btn-lg px-5"
                      >
                        Entrar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
