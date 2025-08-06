"use client";

import styles from "./styles.module.css";
import { ActionRegisterClient } from "@/actions/actions-clientes";
import { createRequestSchemaCliente } from "@/schemas/cliente/clienteSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export function FormRegisterClient() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      nome: formData.get("nome"),
      telefone: formData.get("telefone"),
      email: formData.get("email"),
    };

    const result = createRequestSchemaCliente.safeParse(data);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors as Record<string, string>);
      return;
    }

    const response = await ActionRegisterClient(formData);

    if (response && !response.success) {
      setErrors(response.errors);
      return;
    }

    window.alert("Figurino cadastrado com sucesso!");
    setErrors({});
    router.push("/dashboard/cliente");
  }

  const inputClass = (field: string, customClass: string) =>
    `${customClass} form-control ${
      errors[field] ? "border border-danger" : ""
    }`;

  return (
    <>
      <Container className={styles.main}>
        <Card className={styles.card}>
          <CardBody className={styles.cardBody}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="nome" className={styles.labelText}>
                  Nome:
                </Label>
                <Input
                  className={inputClass("nome", styles.formInput)}
                  type="text"
                  name="nome"
                  id="nome"
                  required
                />
                {errors.nome && (
                  <div className="col-auto">
                    <span className={styles.errorMsg}>{errors.nome}</span>
                  </div>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="telefone" className={styles.labelText}>
                  Telefone:
                </Label>
                <Input
                  className={inputClass("nome", styles.formInput)}
                  type="tel"
                  name="telefone"
                  id="telefone"
                  required
                />
                {errors.telefone && (
                  <div className="col-auto">
                    <span className={styles.errorMsg}>{errors.telefone}</span>
                  </div>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email" className={styles.labelText}>
                  Email:
                </Label>
                <Input
                  className={inputClass("nome", styles.formInput)}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="johnDoe@email.com"
                />
                {errors.email && (
                  <div className="col-auto">
                    <span className={styles.errorMsg}>{errors.email}</span>
                  </div>
                )}
              </FormGroup>

              <div>
                <Button type="submit" className={styles.formBtn}>
                  Enviar
                </Button>
                <Link href={"/dashboard/cliente"}>
                  <Button className={styles.linkBtn}>Voltar</Button>
                </Link>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </>
  );
}
