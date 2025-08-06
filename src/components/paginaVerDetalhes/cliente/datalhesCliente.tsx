import { formatDate } from "@/utils/dateFormat/dataFormatPt-Br";
import { Client } from "@/model/Cliente";
import Link from "next/link";
import styles from "./styles.module.css";
import { Card, CardBody, CardHeader, Container } from "reactstrap";

interface DetalhesClienteProps {
  client: Client;
}

export default function DetalhesCliente({ client }: DetalhesClienteProps) {
  return (
    <Container>
      <section className={styles.main}>
        <Card className={styles.card}>
          <CardHeader>
            <h2 className={styles.cardTitle}>
              {" "}
              Nome do cliente: {client.name}
            </h2>
          </CardHeader>
          <CardBody className={styles.cardBody}>
            <p>
              <strong>ID:</strong> {client.id}
            </p>
            <p>
              <strong>Telefone:</strong> {client.phone}
            </p>
            <p>
              <strong>Email:</strong> {client.email}
            </p>
            <p>
              <strong>Cliente cadastrado em:</strong>{" "}
              {formatDate(client.createdAt)}
            </p>
            <p>
              <strong>Cadastro atualizado em:</strong>{" "}
              {formatDate(client.updatedAt)}
            </p>
          </CardBody>
          <div className="container mb-3">
            <Link href={"/dashboard/cliente"}>
              <button className={styles.linkBtn}>Voltar</button>
            </Link>
          </div>
        </Card>
      </section>
    </Container>
  );
}
