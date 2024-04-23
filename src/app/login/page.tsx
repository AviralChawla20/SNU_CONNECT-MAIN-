"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
// import { useRouter } from "next/router";
import { redirect } from "next/navigation";

// Existing imports and function declaration...

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // const router = useRouter();

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log("Login successful.");
        // redirect("/main");
        localStorage.setItem("email", formData.email);
        window.location.href = "/main";

        // Optionally, redirect to another page or show a success message
      }
      else if (response.status === 401) {
        console.error("Invalid password.");
        // Handle error scenario
      }
      else if (response.status === 404) {
        console.error("Invalid request body.");
        // Handle error scenario
      }
      else {
        console.error("Login failed.");
        // Handle error scenario
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error scenario
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.loginBox}>
        <div className={styles.logo}>
          <img src="Picture1.jpg" alt="" />
        </div>
        <div className={styles.credentials}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button className={styles.login} type="submit">
              Login
            </button>
            <p>
              Don&apos;t have an account yet? <Link href={"/signup"}>Sign up!</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
