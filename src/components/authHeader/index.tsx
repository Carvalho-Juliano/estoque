"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button, Container, Nav } from "reactstrap";
import { useState } from "react";
import Modal from "react-modal";
import styles from "./styles.module.css";

export default function Header(): React.ReactNode {
  const { data: session, status } = useSession();
  const [modalOpen, setModalIsOpen] = useState(false);

  async function handleLogout() {
    const logout = signOut({ callbackUrl: "/login" });
    return logout;
  }

  function handleOpenModal() {
    setModalIsOpen(true);
  }

  function handleCloseModal() {
    setModalIsOpen(false);
  }

  return (
    <Nav className={styles.nav}>
      <Container className={styles.navContainer}>
        <div className={styles.leftGroup}>
          <Link href={"/dashboard"} className={styles.navItem}>
            <i className="bi bi-bar-chart-fill"></i> Dashboard
          </Link>
        </div>

        <div className={styles.rightGroup}>
          <Link href={"/dashboard/figurino"}>
            <Button className={styles.navItem} outline>
              Figurinos
            </Button>
          </Link>
          <Link href={"/dashboard/emprestimo"}>
            <Button className={styles.navItem} outline>
              Emprestimos
            </Button>
          </Link>
          {status === "authenticated" && (
            <li className="nav-item dropdown d-flex align-items-center ms-3">
              <p onClick={handleOpenModal} className={styles.userProfile}>
                {session.user!.email}
                <i className="bi bi-three-dots-vertical"></i>
              </p>
              <Modal
                isOpen={modalOpen}
                onRequestClose={handleCloseModal}
                shouldCloseOnEsc={true}
                ariaHideApp={false}
                className={styles.modal}
                overlayClassName={styles.overlayModal}
              >
                <Link href={"/dashboard/profile"} className={styles.modalLink}>
                  Meus dados
                </Link>
                <p className={styles.modalLink} onClick={handleLogout}>
                  Sair
                </p>
              </Modal>
            </li>
          )}
        </div>
      </Container>
    </Nav>
  );
}
