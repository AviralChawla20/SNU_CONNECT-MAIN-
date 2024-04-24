"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Main() {
  const email = localStorage.getItem("email");
  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/tweets", { method: "GET" });
        if (response.ok) {
          const data = await response.json();
          console.log(data)

        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Call the fetchUserData function when component mounts
  }, []);
  console.log(email);
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
      <div className={styles.content}>
        <div className={styles.section1}>
          <div className={styles.header}>
            <h1>Tweets</h1>
          </div>
          <div className={styles.tweets}></div>
        </div>
        <div className={styles.section2}>
          <div className={styles.header}>
            <h1>What&apos;s on your mind</h1>
          </div>
          <div className={styles.blog}>
            <form action="">
              <label htmlFor="">Title:</label>
              <br />
              <input type="text" name="title" id="" required />
              <br />
              <label htmlFor="">Content:</label>
              <br />
              <textarea name="" id="" cols={30} rows={20}></textarea>
            </form>
            <button className={styles.btn} type="submit">
              Submit
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
