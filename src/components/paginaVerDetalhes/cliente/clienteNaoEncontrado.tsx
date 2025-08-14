import Link from "next/link";
import styles from "./styles.module.css";
import { Card, CardBody, CardHeader, Container } from "reactstrap";

export default function ClienteNaoEncontrado() {
  return (
    <Container className={styles.main}>
      <Card className={styles.card}>
        <CardHeader>
          <h2 className={styles.cardTitle}> 404 Cliente não encontrado!</h2>
          <CardBody>
            <p className={styles.cardBody}>
              O cliente requisitado nao foi encontrado no nosso banco de dados.
            </p>
            <Link href={`/dashboard/cliente`}>
              <button
                className={styles.linkBtn}
                type="button"
                style={{ marginLeft: "-1px" }}
              >
                <i className="bi bi-reply-fill"></i> Voltar
              </button>
            </Link>
          </CardBody>
        </CardHeader>
      </Card>
    </Container>
  );
}
