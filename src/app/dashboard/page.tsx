import { Emprestimo } from "@/model/Emprestimo";
import { Costume } from "@/model/Figurino";
import { Client } from "@/model/Cliente";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LoansTable from "@/components/tabelas/emprestimo/tabelaEmprestimos";
import styles from "./styles.module.css";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/login");

  const loans = await Emprestimo.findAll();
  const totalQuantityOfLoans = await Emprestimo.registeredLoans();
  const totalCostumes = await Costume.getTotalQuantity();
  const totalRegisteredCostumes = await Costume.getRegisteredCostumes();
  const registeredClients = await Client.getAllRegisteredClients();

  return (
    <Container className={styles.main}>
      <h1 className={styles.dashboardTitle}>Sistema de Controle de Estoque</h1>
      <section className="mb-5">
        <h2 className={styles.sectionSubtitle}>
          📊 Informações sobre o estoque
        </h2>
        <Row>
          <Col md="3">
            <Card className={styles.customCard}>
              <CardBody className={styles.cardBody}>
                <CardTitle className={styles.cardTitle}>
                  Total de Figurinos
                </CardTitle>
                <CardText className={styles.cardText}>{totalCostumes}</CardText>
              </CardBody>
            </Card>
          </Col>

          <Col md="3">
            <Card className={styles.customCard}>
              <CardBody className={styles.cardBody}>
                <CardTitle className={styles.cardTitle}>
                  Figurinos cadastrados
                </CardTitle>
                <CardText className={styles.cardText}>
                  {totalRegisteredCostumes}
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col md="3">
            <Card className={styles.customCard}>
              <CardBody className={styles.cardBody}>
                <CardTitle className={styles.cardTitle}>
                  Empréstimos em andamento
                </CardTitle>
                <CardText className={styles.cardText}>
                  {totalQuantityOfLoans}
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col md="3">
            <Card className={styles.customCard}>
              <CardBody className={styles.cardBody}>
                <CardTitle className={styles.cardTitle}>
                  Clientes Registrados
                </CardTitle>
                <CardText className={styles.cardText}>
                  {registeredClients}
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </section>

      <section>
        <LoansTable loans={loans} />
      </section>
    </Container>
  );
}
