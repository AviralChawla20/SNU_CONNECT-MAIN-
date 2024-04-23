"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { redirect } from "next/navigation";


export default function Signup() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRoleSelection = (role: string) => {
    setSelectedRole(role);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData = { ...formData, role: selectedRole };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 200) {
        console.log("User data sent successfully.");

        console.log(response);
        window.location.href = "/loginz";
        // Optionally, reset form fields or show a success message
      } else {
        console.error("Failed to send user data.");
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
          <form action="" className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
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
            {/* Role buttons */}
            <div className={styles.roles}>
              <button
                className={`${styles.role} ${selectedRole === "Alumni" ? styles.selected : ""
                  }`}
                onClick={() => handleRoleSelection("Alumni")}
                type="button"
              >
                Alumni
              </button>
              <button
                className={`${styles.role} ${selectedRole === "Student" ? styles.selected : ""
                  }`}
                onClick={() => handleRoleSelection("Student")}
                type="button"
              >
                Student
              </button>
            </div>
            <button className={styles.login} type="submit">
              Signup
            </button>
            <p>
              Don't have an account yet? <Link href={"/login"}>Login!</Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
