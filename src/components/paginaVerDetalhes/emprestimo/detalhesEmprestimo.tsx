import { formatDate } from "@/utils/dateFormat/dataFormatPt-Br";
import { DetailedLoan } from "@/model/Emprestimo";
import Link from "next/link";
import styles from "./styles.module.css";
import { Card, CardBody, CardHeader, Container } from "reactstrap";

interface PropsDetalhesEmprestimo {
  emprestimo: DetailedLoan;
}

export default function LoanDetails({ emprestimo }: PropsDetalhesEmprestimo) {
  return (
    <>
      <Container>
        <section className={styles.main}>
          <Card className={styles.card}>
            <CardHeader>
              <h2 className={styles.cardTitle}>
                Detalhes do emprestimo do cliente: {emprestimo.clientName}
              </h2>
            </CardHeader>
            <CardBody className={styles.cardBody}>
              <p>
                <strong>Figurino emprestado: </strong>{" "}
                {emprestimo.costumeDescription}
              </p>
              <p>
                <strong>Quantidade: </strong> {emprestimo.quantity} unidades
              </p>
              <p>
                <strong>Data do emprestimo: </strong>
                {formatDate(emprestimo.createdAt)}
              </p>
            </CardBody>
            <div className="container mb-3">
              <Link href={"/dashboard/emprestimo"}>
                <button className={styles.linkBtn}>Voltar</button>
              </Link>
            </div>
          </Card>
        </section>
      </Container>
    </>
  );
}
