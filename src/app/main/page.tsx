"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Main() {
  const email = localStorage.getItem("email");
  console.log(email)
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
          <Link href={"/main"}>
            <h4 className={styles.links}>Home</h4>
          </Link>
          <h4 className={styles.links}>Internships</h4>
          <Link href={"/profile"}>
            <FontAwesomeIcon icon={faUser} size="lg" className={styles.links} />
          </Link>
        </div>
      </nav>
      <div className={styles.content}></div>
    </main>
  );
}
