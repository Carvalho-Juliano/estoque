"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./styles.module.css";
import {
  Button,
  Card,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default function LoginPageComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const router = useRouter();

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setErro("");

    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
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

    router.push("/dashboard");
  }
  return (
    <>
      <section className={styles.main}>
        <Container className="py-5">
          <Card className={styles.card}>
            <p className={styles.cardTitle}>LOGIN</p>
            <Form className={styles.form} onSubmit={handleSubmit}>
              <FormGroup>
                <Label className={styles.formLabel} htmlFor="email">
                  EMAIL
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  className={styles.formInput}
                  value={email}
                  required
                  onChange={(ev) => setEmail(ev.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label className={styles.formLabel} htmlFor="password">
                  SENHA
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  className={styles.formInput}
                  value={password}
                  required
                  onChange={(ev) => setPassword(ev.target.value)}
                />

                {erro && <div className={styles.errorMessage}>{erro}</div>}
              </FormGroup>

              <Button type="submit" className={styles.formBtn}>
                ENTRAR
              </Button>
            </Form>
          </Card>
        </Container>
      </section>
    </>
  );
}
