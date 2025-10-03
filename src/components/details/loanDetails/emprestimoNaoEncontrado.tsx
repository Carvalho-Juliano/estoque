import styles from "./styles.module.css";
import Link from "next/link";
import { Card, CardBody, CardHeader, Container } from "reactstrap";

export default function EmprestimoNaoEncontrado() {
  return (
    <Container className={styles.main}>
      <Card className={styles.card}>
        <CardHeader>
          <h2 className={styles.cardTitle}>404 Emprestimo não encontrado!</h2>
          <CardBody>
            <p className={styles.cardBody}>
              O emprestimo requisitado nao foi encontrado no nosso banco de
              dados.
            </p>
            <Link href={`/dashboard/emprestimo`}>
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
