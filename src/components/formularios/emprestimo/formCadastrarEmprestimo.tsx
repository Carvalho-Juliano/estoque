"use client";

import { ActionRegisterLoan } from "@/actions/actions-emprestimos";
import { useState } from "react";
import styles from "./styles.module.css";
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
import { createRequestSchemaEmprestimo } from "@/schemas/emprestimo/emprestimoSchema";
import { useRouter } from "next/navigation";

export function FormRegisterLoan() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const body = {
      clientId: Number(formData.get("clientId") || 0),
      costumeId: Number(formData.get("costumeId") || 0),
      quantity: Number(formData.get("quantity") || 0),
    };
    console.log(body);

    const result = createRequestSchemaEmprestimo.safeParse(body);
    console.log(result);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    const response = await ActionRegisterLoan(body);
    if (!response.success) {
      setErrors(response.errors);
      return;
    }

    window.alert(response.message);
    setErrors({});
    router.push("/dashboard/emprestimo");
  }

  const inputClass = (field: string, customClass: string) =>
    `${customClass} form-control ${
      errors[field] ? "border border-danger" : ""
    }`;

  return (
    <>
      <Container className={styles.main}>
        <h2 style={{ color: "#03c04a" }}>Cadastrar novo emprestimo</h2>
        <Card className={styles.card}>
          <CardBody className={styles.cardBody}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="clientId" className={styles.labelText}>
                  Cliente:
                </Label>
                <Input
                  className={inputClass("clientId", styles.formInput)}
                  type="number"
                  name="clientId"
                  id="clientId"
                  required
                />
                {errors.clientId?.map((msg, i) => (
                  <span key={i} className={styles.errorMsg}>
                    {msg}
                  </span>
                ))}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="costumeId" className={styles.labelText}>
                  Figurino:
                </Label>
                <Input
                  className={inputClass("costumeId", styles.formInput)}
                  type="number"
                  name="costumeId"
                  id="costumeId"
                  required
                />
                {errors.costumeId && (
                  <div className="col-auto">
                    <span className={styles.errorMsg}>{errors.costumeId}</span>
                  </div>
                )}
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
                {errors.quantity && (
                  <div className="col-auto">
                    <span className={styles.errorMsg}>{errors.quantity}</span>
                  </div>
                )}
              </FormGroup>
              <div className={styles.globalErrorDiv}>
                {errors._global?.map((msg, i) => (
                  <span key={i} className={styles.errorGlobal}>
                    {msg}
                  </span>
                ))}
              </div>
              <div>
                <Button type="submit" className={styles.formBtn}>
                  Enviar
                </Button>
                <Link href={"/dashboard/emprestimo"}>
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
