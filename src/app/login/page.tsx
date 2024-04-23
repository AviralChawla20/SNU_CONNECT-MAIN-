"use client";
import styles from "./page.module.css";
import Link from "next/link";

export default function Login() {
  return (
    <main className={styles.main}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <img src="Picture1.jpg" alt="" />
        </div>
        <div className={styles.credentials}>
          <form action="" className={styles.form}>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className={styles.login}>Login</button>
            <p>
              Don't have an account yet? <Link href={"/signup"}>Sign up!</Link>
            </p>
            {/* <div className={styles.roles}>
              <button className={styles.role}>Alumni</button>
              <button className={styles.role}>Student</button>
            </div> */}
          </form>
        </div>
      </div>
    </main>
  );
}
