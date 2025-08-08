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

export function FormRegisterLoan() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [clientId, setClientId] = useState("");
  const [costumeId, setCostumeId] = useState("");
  const [quantity, setQuantity] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const clientId = Number(formData.get("clientId"));
    const costumeId = Number(formData.get("costumeId"));
    const quantity = Number(formData.get("quantity"));
    const body = {
      clientId,
      costumeId,
      quantity,
    };

    const response = await ActionRegisterLoan({ body });

    if (response && !response.success) {
      setErrors(response.errors);
      return;
    }

    window.alert("Emprestimo cadastrado com sucesso!");
    setErrors({});
    setClientId("");
    setCostumeId("");
    setQuantity("");
  }

  function inputClass(field: string, customClass: string) {
    return `${customClass} form-control ${
      errors[field] ? "border border-danger" : ""
    }`;
  }

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
                  value={clientId}
                  onChange={(event) => setClientId(event.target.value)}
                  required
                />
                {errors.clientId && (
                  <div className="col-auto">
                    <span className={styles.errorMsg}>{errors.clientId}</span>
                  </div>
                )}
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
                  value={costumeId}
                  onChange={(event) => setCostumeId(event.target.value)}
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
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  required
                />
                {errors.quantity && (
                  <div className="col-auto">
                    <span className={styles.errorMsg}>{errors.quantity}</span>
                  </div>
                )}
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
