"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface Internship {
  company: string;
  stipend: number;
  location: string;
  role: string;
  description: string;
  name: string;
}

interface newInternship {
  company: string;
  stipend: number;
  location: string;
  role: string;
  description: string;
  email: string;
}

export default function Internship() {
  var ro = localStorage.getItem("role");
  const email = localStorage.getItem("email") || "";
  const isStudent = ro === "Student";
  const [internships, setInternships] = useState<Internship[]>([]);
  const [newInternships, setNewInternships] = useState<newInternship[]>([]);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [stipend, setStipend] = useState(0);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchInternshipsData = async () => {
      try {
        const response = await fetch("/api/internships", { method: "GET" });
        if (response.ok) {
          const data = await response.json();
          setInternships((data as Internship[]).reverse());
        } else {
          throw new Error("Failed to fetch internships data");
        }
      } catch (error) {
        console.error("Error fetching internships data:", error);
      }
    };

    fetchInternshipsData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newInternship: newInternship = {
      company: company,
      stipend: stipend,
      location: location,
      role: role,
      description: description,
      email: email,
    };

    setNewInternships([...newInternships, newInternship]);

    setRole("");
    setCompany("");
    setStipend(0);
    setLocation("");
    setDescription("");

    try {
      const response = await fetch("/api/internships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInternship),
      });
      if (!response.ok) {
        throw new Error("Failed to save internship");
      }
    } catch (error) {
      console.error("Error saving internship:", error);
    }
    window.location.reload();
  };

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
        <div
          className={styles.section1}
          style={{ width: isStudent ? "80%" : "60%" }}
        >
          <div className={styles.header}>
            <h1>Internships</h1>
          </div>
          <div className={styles.tweets}>
            {internships.map((internship, index) => (
              <div key={index} className={styles.tweet}>
                <h2>{internship.name}</h2>
                <h3>{internship.role}</h3>
                <p>
                  <strong>Company:</strong> {internship.company}
                </p>
                <p>
                  <strong>Stipend:</strong> {internship.stipend}
                </p>
                <p>
                  <strong>Location:</strong> {internship.location}
                </p>
                <p>
                  <strong>Description:</strong> {internship.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        {!isStudent && (
          <div className={styles.section2}>
            <div className={styles.header}>
              <h1>Internship Details</h1>
            </div>
            <div className={styles.blog}>
              <form action="" onSubmit={handleSubmit}>
                <label htmlFor="role">Role:</label>
                <br />
                <input
                  type="text"
                  id="role"
                  onChange={(e) => setRole(e.target.value)}
                  name="role"
                  required
                />
                <br />
                <label htmlFor="company">Company:</label>
                <br />
                <input
                  type="text"
                  id="company"
                  onChange={(e) => setCompany(e.target.value)}
                  name="company"
                  required
                />
                <br />
                <label htmlFor="stipend">Stipend:</label>
                <br />
                <input
                  type="number"
                  id="stipend"
                  onChange={(e) => setStipend(parseInt(e.target.value))}
                  name="stipend"
                  required
                />
                <br />
                <label htmlFor="location">Location:</label>
                <br />
                <input
                  type="text"
                  id="location"
                  onChange={(e) => setLocation(e.target.value)}
                  name="location"
                  required
                />
                <br />
                <label htmlFor="description">Description:</label>
                <br />
                <textarea
                  id="description"
                  onChange={(e) => setDescription(e.target.value)}
                  name="description"
                  cols={30}
                  rows={10}
                ></textarea>
                <button className={styles.btn} type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
