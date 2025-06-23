"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header(): React.ReactNode {
  const { data: session, status } = useSession();

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
                <li className="nav-item d-flex align-item-center ms-3 mt-2">
                  <span className="me-2">{session.user?.email}</span>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => signOut({ callbackUrl: "/login" })}
                  >
                    Sair
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
