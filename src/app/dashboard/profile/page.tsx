"use client";

import { useRouter } from "next/navigation";
import { Container, Row, Col, Button } from "reactstrap";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PageSpinner from "@/components/spinner";
import UserFormComponent from "@/components/profile/user";
import PasswordForm from "@/components/profile/password";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [form, setForm] = useState("userForm");
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <PageSpinner />;
  if (!session) return null;

  return (
    <div className={styles.main}>
      <Container className={styles.gridContainer}>
        <p className={styles.title}>INFORMAÇÕES DA CONTA</p>
        <Row className="pt-3 pb-5">
          <Col md={4} className={styles.btnCloumn}>
            <Button
              className={styles.renderForm}
              style={{ color: form === "userForm" ? "white" : "#c0c0c0" }}
              onClick={() => {
                setForm("userForm");
              }}
            >
              DADOS PESSOAIS
            </Button>
            <Button
              className={styles.renderForm}
              style={{ color: form === "passwordForm" ? "white" : "#c0c0c0" }}
              onClick={() => {
                setForm("passwordForm");
              }}
            >
              SENHA
            </Button>
          </Col>
          <Col md>
            {form === "userForm" ? <UserFormComponent /> : <PasswordForm />}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
