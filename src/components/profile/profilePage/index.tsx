"use client";

import { Container, Row, Col, Button } from "reactstrap";
import styles from "./styles.module.css";
import { useState } from "react";
import UserInfoFormComponent from "@/components/profile/userInfoForm";
import PasswordFormComponent from "@/components/profile/passwordForm";

export default function ProfilePageComponent() {
  const [form, setForm] = useState("userForm");

  return (
    <div className={styles.main}>
      <Container className={styles.gridContainer}>
        <p className={styles.title}>INFORMAÇÕES DA CONTA</p>
        <Row className="pt-3 pb-5">
          <Col md={4} className={styles.btnCloumn}>
            <Button
              className={styles.renderForm}
              style={{
                color: form === "userForm" ? "#03c04a" : "white",
                borderColor: form === "userForm" ? "#03c04a" : "white",
              }}
              onClick={() => {
                setForm("userForm");
              }}
            >
              DADOS PESSOAIS
            </Button>
            <Button
              className={styles.renderForm}
              style={{
                color: form === "passwordForm" ? "#03c04a" : "white",
                borderColor: form === "passwordForm" ? "#03c04a" : "white",
              }}
              onClick={() => {
                setForm("passwordForm");
              }}
            >
              SENHA
            </Button>
          </Col>
          <Col md>
            {form === "userForm" ? (
              <UserInfoFormComponent />
            ) : (
              <PasswordFormComponent />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
