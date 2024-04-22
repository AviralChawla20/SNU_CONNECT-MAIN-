"use client";
import styles from "./page.module.css";
import Link from "next/link";

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
        <div className={styles.tagline}>
          <h1>
            Connecting past, present, and future: Where alumni memories meet
            student aspirations.
          </h1>
          <p>
            Discover, Connect, Thrive. Explore alumni reunions, unlock
            opportunities, and ignite your future with exclusive internships and
            mentorship
          </p>
          <div className={styles.buttons}>
            <Link href={"/login"}>
              <button>Discover</button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
