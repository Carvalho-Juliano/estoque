"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
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
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link href={"/dashboard"} className="navbar-brand">
            <i className="bi bi-bar-chart-fill"></i> Dashboard
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto">
              <li className="nav-item">
                <Link
                  href={"/dashboard/figurino"}
                  className="nav-link"
                  aria-current="page"
                >
                  Figurinos
                </Link>
              </li>
              <li className="nav-item">
                <Link href={"/dashboard/emprestimo"} className="nav-link">
                  Emprestimos
                </Link>
              </li>
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
                    <p className={styles.modalLink} onClick={handleLogout}>
                      Sair
                    </p>
                  </Modal>
                  {/* <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => signOut({ callbackUrl: "/login" })}
                      >
                        Sair
                      </button>
                    </li>
                  </ul> */}
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
