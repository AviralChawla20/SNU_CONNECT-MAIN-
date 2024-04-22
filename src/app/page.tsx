"use client";
import styles from "./page.module.css";
import ReactPlayer from "react-player";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.nav}>
        <nav className={styles.navBar}>
          <div className={styles.logo}>
            <img src="Picture1.jpg" alt="" />
          </div>
          <button className={styles.btn}>Login</button>
          <button className={styles.btn}>Sign up</button>
        </nav>
      </div>
      <div className={styles.mainPage}>
        <div className={styles.tagline}></div>
        <div className={styles.background}>
          <img src="Group 12.png" alt="" />
        </div>
      </div>
    </main>
  );
}
