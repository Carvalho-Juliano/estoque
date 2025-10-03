import { formatDate } from "@/utils/dateFormat/dataFormatPt-Br";
import { Costume } from "@/model/Figurino";
import Link from "next/link";
import styles from "./styles.module.css";
import { Card, CardBody, CardHeader, Container } from "reactstrap";

interface detailedCustomProps {
  costume: Costume;
}

export default function CostumeDetails({ costume }: detailedCustomProps) {
  return (
    <Container>
      <section className={styles.main}>
        <Card className={styles.card}>
          <CardHeader>
            <h2 className={styles.cardTitle}>
              Figurino: {costume.description}
            </h2>
          </CardHeader>
          <CardBody className={styles.cardBody}>
            <p>
              ID:{"       "}
              {costume.id}
            </p>
            <p>
              Descrição:{"       "}
              {costume.description}
            </p>
            <p>
              Tamanho:{"       "}
              {costume.size}
            </p>
            <p>
              Quantidade total:{"       "}
              {costume.quantity}
            </p>
            <p>
              Quantidade disponivel:{"       "}
              {costume.available_quantity}
            </p>
            <p>
              Figurino cadastrado em:{"       "}
              {formatDate(costume.createdAt)}
            </p>
            <p>
              Atualizado pela ultima vez em:{"       "}
              {formatDate(costume.updatedAt)}
            </p>
          </CardBody>
          <div className="container mb-3">
            <Link href={"/dashboard/figurino"}>
              <button className={styles.linkBtn}>Voltar</button>
            </Link>
          </div>
        </Card>
      </section>
    </Container>
  );
}
