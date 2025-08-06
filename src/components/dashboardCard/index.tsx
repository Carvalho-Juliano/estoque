import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import styles from "./styles.module.css";

interface DashboardCardProps {
  title: string;
  countNumber: number;
}

export default function DashboardCard({
  title,
  countNumber,
}: DashboardCardProps) {
  return (
    <>
      <Card className={styles.customCard}>
        <CardBody className={styles.cardBody}>
          <CardTitle className={styles.cardTitle}>{title}</CardTitle>
          <CardText>{countNumber}</CardText>
        </CardBody>
      </Card>
    </>
  );
}
