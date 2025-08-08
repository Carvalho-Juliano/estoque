"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import styles from "./styles.module.css";
import { ActionUpdateUserWithoutPassword } from "@/actions/action-usuario";

export default function UserInfoFormComponent() {
  const { data: session } = useSession();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<Record<string, string[]>>({});
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      setFirstName(session.user.firstName || "");
      setLastName(session.user.lastName || "");
      setPhone(session.user.phone || "");
      setEmail(session.user.email || "");
    }
  }, [session]);

  async function handleUserUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session?.user.id) {
      alert("Usuario não identificado");
      router.push("/login");
      return;
    }
    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const body = {
      firstName,
      lastName,
      email,
      phone,
    };
    const response = await ActionUpdateUserWithoutPassword(
      session.user.id,
      body
    );
    console.log(response);

    if (!response.success) {
      setError(response.errors);
      return;
    }

    setError({});
    window.alert("Usuário atualizado com sucesso!");
    router.push("/dashboard/profile");
  }

  return (
    <>
      <Form onSubmit={handleUserUpdate} className={styles.form}>
        <div className={styles.formName}>
          <p className={styles.userName}>{`${firstName} ${lastName}`}</p>
        </div>
        <hr />
        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label className={styles.label} htmlFor="firstName">
              NOME
            </Label>
            <Input
              name="firstName"
              type="text"
              id="firstName"
              placeholder="Digite seu primeiro nome"
              required
              className={`${styles.inputFlex} ${
                error.firstName ? "border border-danger" : ""
              }`}
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            {error.firstName?.map((msg, i) => (
              <span key={i} className="text-danger form-text">
                {msg}
              </span>
            ))}
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} htmlFor="lastName">
              SOBRENOME
            </Label>
            <Input
              name="lastName"
              type="text"
              id="lastName"
              placeholder="Digite seu sobrenome"
              required
              className={`${styles.inputFlex} ${
                error.lastName ? "border border-danger" : ""
              }`}
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
            {error.lastName?.map((msg, i) => (
              <span key={i} className="text-danger form-text">
                {msg}
              </span>
            ))}
          </FormGroup>
        </div>
        <div className={styles.inputNormalDiv}>
          <FormGroup>
            <Label className={styles.label} htmlFor="phone">
              TELEFONE
            </Label>
            <Input
              name="phone"
              type="tel"
              id="phone"
              placeholder="(xx) 9xxxxx-xxxx"
              required
              maxLength={11}
              className={`${styles.input} ${
                error.phone ? "border border-danger" : ""
              }`}
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            {error.phone?.map((msg, i) => (
              <span key={i} className="text-danger form-text">
                {msg}
              </span>
            ))}
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} htmlFor="email">
              EMAIL
            </Label>
            <Input
              name="email"
              type="email"
              id="email"
              placeholder="Digite seu email"
              required
              className={`${styles.input} ${
                error.email ? "border border-danger" : ""
              }`}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            {error.email?.map((msg, i) => (
              <span key={i} className="text-danger form-text">
                {msg}
              </span>
            ))}
          </FormGroup>

          <Button className={styles.formBtn} outline type="submit">
            Salvar alterações
          </Button>
        </div>
      </Form>
    </>
  );
}
