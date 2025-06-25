"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
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
                <li className="nav-item dropdown d-flex align-items-center ms-3">
                  <a
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {session.user?.email}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <button
                        className="dropdown-item"
                        onClick={() => signOut({ callbackUrl: "/login" })}
                      >
                        Sair
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
