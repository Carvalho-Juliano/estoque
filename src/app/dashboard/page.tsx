import { Emprestimo } from "@/model/Emprestimo";
import { Costume } from "@/model/Figurino";
import { Client } from "@/model/Cliente";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import LoansTable from "@/components/tabelas/emprestimo/tabelaEmprestimos";
import styles from "./styles.module.css";
import { Col, Container, Row } from "reactstrap";
import DashboardCard from "@/components/dashboardCard";

export default async function HomePage() {
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
            <DashboardCard
              title={"Total de figurinos"}
              countNumber={totalCostumes}
            />
          </Col>

          <Col md="3">
            <DashboardCard
              title={"Figurinos cadastrados"}
              countNumber={totalRegisteredCostumes}
            />
          </Col>

          <Col md="3">
            <DashboardCard
              title={"Total de emprestimos pendentes"}
              countNumber={totalQuantityOfLoans}
            />
          </Col>

          <Col md="3">
            <DashboardCard
              title={"Total de clientes registrados"}
              countNumber={registeredClients}
            />
          </Col>
        </Row>
      </section>

      <section>
        <LoansTable loans={loans} />
      </section>
    </Container>
  );
}
