"use client";
import styles from "./styles.module.css";
import { ActionRegisterCostume } from "@/actions/actions-figurinos";
import { useState } from "react";
import { createRequestSchemaFigurino } from "@/schemas/figurino/figurinoSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export function FormRegisterCostume() {
  // Estado para guardar os erros. Começa vazio até o usuário preencher o formulário com algum erro.
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      description: formData.get("description") ?? "",
      quantity: Number(formData.get("quantity")) ?? 0,
      size: formData.get("size") ?? "",
      available_quantity: Number(formData.get("available_quantity")) ?? 0,
    };

    const result = createRequestSchemaFigurino.safeParse(data);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    await ActionRegisterCostume(formData);
    window.alert("Figurino cadastrado com sucesso!");
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
        <h2 style={{ color: "#03c04a" }}>Cadastrar um novo figurino</h2>
        <Card className={styles.card}>
          <CardBody className={styles.cardBody}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="description" className={styles.labelText}>
                  Descrição:
                </Label>
                <Input
                  className={inputClass("description", styles.formInput)}
                  type="text"
                  name="description"
                  id="description"
                  required
                />
                {errors.description?.map((msg, i) => (
                  <span key={i} className={styles.errorMsg}>
                    {msg}
                  </span>
                ))}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="quantity" className={styles.labelText}>
                  Quantidade:
                </Label>
                <Input
                  className={inputClass("quantity", styles.formInput)}
                  type="number"
                  name="quantity"
                  id="quantity"
                  required
                />
                {errors.quantity?.map((msg, i) => (
                  <span key={i} className={styles.errorMsg}>
                    {msg}
                  </span>
                ))}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="size" className={styles.labelText}>
                  Tamanho:
                </Label>
                <Input
                  className={inputClass("size", styles.formInput)}
                  type="text"
                  name="size"
                  id="size"
                  required
                />
                {errors.size?.map((msg, i) => (
                  <span key={i} className={styles.errorMsg}>
                    {msg}
                  </span>
                ))}
              </FormGroup>
              <FormGroup>
                <Label
                  htmlFor="available_quantity"
                  className={styles.labelText}
                >
                  Disponível
                </Label>
                <Input
                  className={inputClass("available_quantity", styles.formInput)}
                  type="number"
                  name="available_quantity"
                  id="available_quantity"
                  required
                />
                {errors.available_quantity?.map((msg, i) => (
                  <span key={i} className={styles.errorMsg}>
                    {msg}
                  </span>
                ))}
              </FormGroup>
              <div>
                <Button type="submit" className={styles.formBtn}>
                  Enviar
                </Button>
                <Link href={"/dashboard/figurino"}>
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
