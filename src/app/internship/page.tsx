"use client"
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
  const [internship, setInternship] = useState<Internship[]>([]);
  const [newInternships, setNewInternship] = useState<newInternship[]>([]);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [stipend, setStipend] = useState(0);
  const [locationn, setLocation] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/internships", { method: "GET" });
        if (response.ok) {
          const data = await response.json();
          setInternship((data as Internship[]).reverse());
          console.log(data)// Set the fetched tweets in state
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Call the fetchUserData function when component mounts
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Create a new tweet object with the title and content
    const newInternship: newInternship = {
      company: company,
      stipend: stipend,
      location: locationn,
      role: role,
      description: description,
      email: email // You can replace this with the user's name if available
    };

    // Update the state with the new tweet
    setNewInternship([...newInternships, newInternship]);

    // Reset the form fields
    setRole("");
    setCompany("");
    setStipend(0);
    setLocation("");
    setDescription("");

    // Optional: Send the new tweet data to the server for saving in the database
    try {
      const response = await fetch("/api/internships", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newInternship),
      });
      if (!response.ok) {
        throw new Error("Failed to save tweet");
      }
      else {
        console.log("Internship data sent successfully.");
        console.log(response)
        // Optionally, reset form fields or show a success message
      }
    } catch (error) {
      console.error("Error saving tweet:", error);
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
        <div className={styles.section1} style={{ width: isStudent ? "80%" : "60%" }}>
          <div className={styles.header}>
            <h1>Internships</h1>
          </div>
          <div className={styles.tweets}></div>
        </div>
        {!isStudent && (
          <div className={styles.section2}>
            <div className={styles.header}>
              <h1>Internship Details</h1>
            </div>
            <div className={styles.blog}>
              <form action="" onSubmit={handleSubmit}>
                <label htmlFor="">Role:</label>
                <br />
                <input type="text" onChange={(e) => setRole(e.target.value)} name="title" id="" required />
                <br />
                <label htmlFor="">Company:</label>
                <br />
                <input type="text" onChange={(e) => setCompany(e.target.value)} name="title" id="" required />
                <br />
                <label htmlFor="">Stipend:</label>
                <br />
                <input type="number" onChange={(e) => setStipend(parseInt(e.target.value))} name="title" id="" required />
                <br />
                <label htmlFor="">Location:</label>
                <br />
                <input type="text" onChange={(e) => setLocation(e.target.value)} name="title" id="" required />
                <br />
                <label htmlFor="">Description:</label>
                <br />
                <textarea name="" onChange={(e) => setDescription(e.target.value)} id="" cols={30} rows={10}></textarea>
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
