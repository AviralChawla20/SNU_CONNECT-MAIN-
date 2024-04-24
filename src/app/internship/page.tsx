"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Internship() {
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
          <Link href={"/internship"}>
            <h4 className={styles.links}>Internships</h4>
          </Link>
          <Link href={"/chat"}>
            <h4 className={styles.links}>Chat</h4>
          </Link>
          <Link href={"/profile"}>
            <FontAwesomeIcon icon={faUser} size="lg" className={styles.links} />
          </Link>
        </div>
      </nav>
      <div className={styles.content}>
        <div className={styles.section1}>
          <div className={styles.header}>
            <h1>Internships</h1>
          </div>
          <div className={styles.tweets}></div>
        </div>
        <div className={styles.section2}>
          <div className={styles.header}>
            <h1>Internship Details</h1>
          </div>
          <div className={styles.blog}>
            <form action="">
              <label htmlFor="">Role:</label>
              <br />
              <input type="text" name="title" id="" required />
              <br />
              <label htmlFor="">Company:</label>
              <br />
              <input type="text" name="title" id="" required />
              <br />
              <label htmlFor="">Stipend:</label>
              <br />
              <input type="text" name="title" id="" required />
              <br />
              <label htmlFor="">Location:</label>
              <br />
              <input type="text" name="title" id="" required />
              <br />
              <label htmlFor="">Description:</label>
              <br />
              <textarea name="" id="" cols={30} rows={10}></textarea>
              <button className={styles.btn} type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
