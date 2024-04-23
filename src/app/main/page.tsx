"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Main() {
  return (
    <main className={styles.main}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src="Picture1.jpg" alt="" />
        </div>
        <div className={styles.searchbar}>
          <form action="">
            <input type="text" placeholder="Search" />
          </form>
        </div>
        <div className={styles.navbtn}>
          <h4 className={styles.links}>Home</h4>
          <h4 className={styles.links}>Internships</h4>
          <FontAwesomeIcon icon={faUser} size="lg" className={styles.links} />
        </div>
      </nav>
    </main>
  );
}
