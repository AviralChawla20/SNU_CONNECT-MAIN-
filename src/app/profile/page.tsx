"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Profile() {
  return (
    <main className={styles.main}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href={"/main"}>
            <img src="Picture1.jpg" alt="" />
          </Link>
        </div>
        <div className={styles.navbtn}>
          <button className={styles.btn}>Log out</button>
        </div>
      </nav>
      <div className={styles.details}>
        <div className={styles.credentials}></div>
      </div>
    </main>
  );
}
