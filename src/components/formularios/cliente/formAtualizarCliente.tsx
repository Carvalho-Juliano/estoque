"use client";

import { ActionUpdatClient } from "@/actions/actions-clientes";
import styles from "./styles.module.css";
import { Client } from "@/model/Cliente";
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
import Link from "next/link";
import { updateRequestSchemaCliente } from "@/schemas/cliente/clienteSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface updateClientProps {
  client: Client;
  id: number;
}

export default function FormUpdateClient({ client, id }: updateClientProps) {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get("name") ?? "",
      phone: formData.get("phone") ?? "",
      email: formData.get("email") ?? "",
    };

    const result = await updateRequestSchemaCliente.safeParse(data);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    await ActionUpdatClient(formData, id);
    window.alert("Cliente atualizado com sucesso!");
    setErrors({});
    router.push("/dashboard/figurino");
  }

  const inputClass = (field: string, customClass: string) =>
    `${customClass} form-control ${
      errors[field] ? "border border-danger" : ""
    }`;
  return (
    <>
      <Container className={styles.main}>
        <h2 style={{ color: "#03c04a" }}>Pagina para atualizar cliente</h2>
        <Card className={styles.card}>
          <CardBody className={styles.cardBody}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="name" className={styles.labelText}>
                  Nome
                </Label>
                <Input
                  className={inputClass("name", styles.formInput)}
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={client.name}
                  required
                />
                {errors.name?.map((msg, i) => (
                  <span key={i} className="text-danger form-text">
                    {msg}
                  </span>
                ))}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="phone" className={styles.labelText}>
                  Telefone
                </Label>
                <Input
                  className={inputClass("phone", styles.formInput)}
                  type="tel"
                  name="phone"
                  id="phone"
                  defaultValue={client.phone}
                  required
                />
                {errors.phone?.map((msg, i) => (
                  <span key={i} className="text-danger form-text">
                    {msg}
                  </span>
                ))}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email" className={styles.labelText}>
                  Email
                </Label>
                <Input
                  className={inputClass("email", styles.formInput)}
                  type="email"
                  name="email"
                  id="email"
                  defaultValue={client.email}
                  required
                />
                {errors.email?.map((msg, i) => (
                  <span key={i} className="text-danger form-text">
                    {msg}
                  </span>
                ))}
              </FormGroup>
              <div>
                <Button type="submit" className={styles.formBtn}>
                  Atualizar
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
