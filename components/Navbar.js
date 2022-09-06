import Logo from "../public/logo.png";
import Image from "next/image";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { checkTokenFromLS } from "../public/scripts/Utils";
import { useEffect, useState } from "react";

export default function Navbar({ button = null }) {
  let [authState, setAuthState] = useState(false);

  useEffect(() => {
    if (checkTokenFromLS({ key: "expires_at" })) {
      setAuthState(true);
    } else {
      setAuthState(false);
    }
  }, []);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link className="navbar-item" href="/">
          <a href="" className="not-link">
            <div
              className={`logo is-flex is-align-items-center ml-5 my-3 ${styles.logo}`}
            >
              <div className={`image is-48x48`}>
                <Image
                  className="is-rounded"
                  src={Logo}
                  alt="logo"
                  layout="fill"
                />
              </div>
              <p className={styles.logoText}>Music Stats</p>
            </div>
          </a>
        </Link>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={(e) => {
            e.currentTarget.classList.toggle("is-active");
            document
              .getElementById(e.currentTarget.dataset.target)
              .classList.toggle("is-active");
          }}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className={`navbar-start ${styles.navbarItemWrapper}`}>
          <a className="navbar-item">Tracks</a>

          <a className="navbar-item">Albums</a>
          <a className="navbar-item">Artists</a>

          <div className="navbar-item has-dropdown is-hoverable">
            <a
              className="navbar-link mb-3"
              onClick={(e) => {
                e.currentTarget.parentElement.classList.toggle("is-active");
              }}
            >
              More
            </a>

            <div className="navbar-dropdown">
              <a className="navbar-item">About</a>
              <a className="navbar-item">Contact</a>
              <hr className="navbar-divider" />
              <a className="navbar-item">Report an issue</a>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!authState ? (
                <Link href="/login">
                  <a className="button is-primary">
                    <strong>Sign in</strong>
                  </a>
                </Link>
              ) : (
                <Link href="/dashboard">
                  <a className="button is-primary">
                    <strong>Dashboard</strong>
                  </a>
                </Link>
              )}
              {button ? (
                <Link href={button.href}>
                  <a className="button is-primary">
                    <strong>{button.text}</strong>
                  </a>
                </Link>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
