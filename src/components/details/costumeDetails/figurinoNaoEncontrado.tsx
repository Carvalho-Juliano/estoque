import styles from "./styles.module.css";
import Link from "next/link";
import { Button, Card, CardBody, CardHeader, Container } from "reactstrap";

export default function FigurinoNaoEncontrado() {
  return (
    <Container className={styles.main}>
      <Card className={styles.card}>
        <CardHeader>
          <h2 className={styles.cardTitle}>404 Figurino não encontrado!</h2>
          <CardBody>
            <p className={styles.cardBody}>
              O figurino requisitado nao foi encontrado no nosso banco de dados.
            </p>
            <Link href={`/dashboard/figurino`}>
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
