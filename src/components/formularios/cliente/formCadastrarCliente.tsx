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
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const body = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
    };

    const result = createRequestSchemaCliente.safeParse(body);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    const actionResponse = await ActionRegisterClient(body);
    if (actionResponse && !actionResponse.success) {
      setErrors(actionResponse.errors);
      return;
    }

    window.alert("Cliente cadastrado com sucesso!");
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
        <h2 style={{ color: "#03c04a" }}>Cadastrar cliente</h2>
        <Card className={styles.card}>
          <CardBody className={styles.cardBody}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name" className={styles.labelText}>
                  Nome:
                </Label>
                <Input
                  className={inputClass("name", styles.formInput)}
                  type="text"
                  name="name"
                  id="name"
                  required
                />
                {errors.name && (
                  <div className="col-auto">
                    <span className={styles.errorMsg}>{errors.name}</span>
                  </div>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="phone" className={styles.labelText}>
                  Telefone:
                </Label>
                <Input
                  className={inputClass("phone", styles.formInput)}
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                />
                {errors.phone && (
                  <div className="col-auto">
                    <span className={styles.errorMsg}>{errors.phone}</span>
                  </div>
                )}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email" className={styles.labelText}>
                  Email:
                </Label>
                <Input
                  className={inputClass("email", styles.formInput)}
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
