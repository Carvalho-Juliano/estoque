"use client";
import { ActionUserUpdatePassword } from "@/actions/action-usuario";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "./styles.module.css";

export default function PasswordFormComponent() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setconfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { data: session } = useSession();
  console.log(session);

  async function handlePasswordUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!session?.user.id) {
      alert("Usuario não identificado");
      return;
    }

    if (newPassword != confirmNewPassword) {
      setErrorMessage("Senha e confirmação de senha diferentes");
      setNewPassword("");
      setconfirmNewPassword("");
      return;
    }

    if (currentPassword === newPassword) {
      setErrorMessage("Você está tentando inserir uma senha igual a antiga!");
      return;
    }

    try {
      const response = await ActionUserUpdatePassword(
        session.user.id,
        currentPassword,
        newPassword
      );

      if ("success" in response && response.success === false) {
        //foi necessário fazer uma checagem de tipo manual pois não consegui encontrar o erro que não estava deixando o typescript encontrar o sucess da minha action
        setErrorMessage(response.errors?.message);
        return;
      }

      window.alert("Senha atualizada com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
      setconfirmNewPassword("");
      setErrorMessage("");
    } catch (error: any) {
      window.alert("Erro inesperado");
    }
  }

  return (
    <>
      <Form className={styles.form} onSubmit={handlePasswordUpdate}>
        <div className={styles.inputNormalDiv}>
          <FormGroup>
            <Label className={styles.label} htmlFor="currentPassword">
              SENHA ATUAL
            </Label>
            <Input
              name="currentPassword"
              type="password"
              id="currentPassword"
              placeholder="**********"
              required
              minLength={6}
              value={currentPassword}
              onChange={(event) => {
                setCurrentPassword(event.currentTarget.value);
              }}
              className={styles.input}
            />
          </FormGroup>
        </div>
        <div className={styles.inputFlexDiv}>
          <FormGroup>
            <Label className={styles.label} htmlFor="newPassword">
              NOVA SENHA
            </Label>
            <Input
              name="newPassword"
              type="password"
              id="newPassword"
              placeholder="**********"
              required
              minLength={6}
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.currentTarget.value);
              }}
              className={styles.inputFlex}
            />
          </FormGroup>
          <FormGroup>
            <Label className={styles.label} htmlFor="confirmNewPassword">
              CONFIRMAR NOVA SENHA
            </Label>
            <Input
              name="confirmNewPassword"
              type="password"
              id="confirmNewPassword"
              placeholder="**********"
              required
              minLength={6}
              value={confirmNewPassword}
              onChange={(event) => {
                setconfirmNewPassword(event.currentTarget.value);
              }}
              className={styles.inputFlex}
            />
          </FormGroup>
        </div>
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}
        <Button type="submit" className={styles.formBtn} outline>
          Salvar alterações
        </Button>
      </Form>
    </>
  );
}
