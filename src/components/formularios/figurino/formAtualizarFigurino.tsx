"use client";
import styles from "./styles.module.css";
import { updateRequestSchemaFigurino } from "@/schemas/figurino/figurinoSchema";
import { useState } from "react";
import { ActionUpdateCostume } from "@/actions/actions-figurinos";
import { Costume } from "@/model/Figurino";
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

interface updateCostumeProps {
  costume: Costume;
  id: number;
}

export function UpdateCostumeForm({ costume, id }: updateCostumeProps) {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data = {
      description: String(formData.get("description")),
      quantity: Number(formData.get("quantity")),
      size: String(formData.get("size")),
      available_quantity: Number(formData.get("available_quantity")),
    };

    const result = updateRequestSchemaFigurino.safeParse(data);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    const actionResponse = await ActionUpdateCostume(id, data);
    if (!actionResponse.success) {
      setErrors(actionResponse.errors);
      window.alert("Erro ao atualizar figurino");
      return;
    }

    window.alert("Figurino atualizado com sucesso!");
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
        <h2 style={{ color: "#03c04a" }}>Atualizar Figurino</h2>
        <Card className={styles.card}>
          <CardBody className={styles.cardBody}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="description" className={styles.labelText}>
                  Descrição
                </Label>
                <Input
                  className={inputClass("description", styles.formInput)}
                  type="text"
                  name="description"
                  id="description"
                  defaultValue={costume.description}
                  required
                />
                {errors.description?.map((msg, i) => (
                  <span key={i} className="text-danger form-text">
                    {msg}
                  </span>
                ))}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="quantity" className={styles.labelText}>
                  Quantidade
                </Label>
                <Input
                  className={inputClass("quantity", styles.formInput)}
                  type="number"
                  name="quantity"
                  id="quantity"
                  defaultValue={costume.quantity}
                  required
                />
                {errors.quantity?.map((msg, i) => (
                  <span key={i} className="text-danger form-text">
                    {msg}
                  </span>
                ))}
              </FormGroup>

              <FormGroup>
                <Label htmlFor="size" className={styles.labelText}>
                  Tamanho
                </Label>
                <Input
                  type="select"
                  name="size"
                  id="size"
                  className={inputClass("size", styles.formInput)}
                >
                  <option value="P" className={styles.formOption}>
                    P
                  </option>
                  <option value="PP" className={styles.formOption}>
                    PP
                  </option>
                  <option value="M" className={styles.formOption}>
                    M
                  </option>
                  <option value="G" className={styles.formOption}>
                    G
                  </option>
                  <option value="GG" className={styles.formOption}>
                    GG
                  </option>
                </Input>
                {errors.size?.map((msg, i) => (
                  <span key={i} className="text-danger form-text">
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
                  defaultValue={costume.available_quantity}
                  required
                />
                {errors.available_quantity?.map((msg, i) => (
                  <span key={i} className="text-danger form-text">
                    {msg}
                  </span>
                ))}
              </FormGroup>
              <div>
                <Button type="submit" className={styles.formBtn}>
                  Atualizar
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
