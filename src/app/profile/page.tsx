"use client";
import { useState, useEffect, ChangeEvent } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Profile() {
  const email = localStorage.getItem("email");
  const [formData, setFormData] = useState({
    email: email,
    name: "",
    phone: "",
    github: "",
    linkedin: "",
    role: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [github, setGithub] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [userData, setUserData] = useState(null);

  // const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/profile?email=" + email, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUserData(data);
          setPhoneNumber(data.phone);
          setRole(data.role)
          console.log(phoneNumber);

          console.log(data.role);
          localStorage.setItem("role", data.role);

          setGithub(data.github);
          // console.log(github);
          setName(data.name);
          setLinkedIn(data.linkedin);

          setFormData({
            ...formData,
            phone: data.phone,
            github: data.github,
            linkedin: data.linkedin,
            name: data.name,
            role: data.role,
          });
          // console.log(role)
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Call the fetchUserData function when component mounts
  }, []);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPhoneNumber = e.target.value;
    setPhoneNumber(inputPhoneNumber);
    setShowSaveButton(inputPhoneNumber.length === 10);
    // const { name, value } = event.target;
    setFormData({ ...formData, ["phone"]: inputPhoneNumber });

  };

  const handleGithubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputGithub = e.target.value;
    setGithub(inputGithub);
    setShowSaveButton(inputGithub.trim() !== "" || linkedIn.trim() !== "");
    setFormData({ ...formData, ["github"]: inputGithub });
  };

  const handleLinkedInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputLinkedIn = e.target.value;
    setLinkedIn(inputLinkedIn);
    setShowSaveButton(inputLinkedIn.trim() !== "" || github.trim() !== "");
    setFormData({ ...formData, ["linkedin"]: inputLinkedIn });
  };

  const handleSaveClick = () => {
    // Handle save action here
    console.log(formData);
    const saveData = async () => {
      try {
        const response = await fetch("/api/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 200) {
          console.log("Profile updated successfully.");
          // redirect("/main");
          // localStorage.setItem("email", formData.email);
          // window.location.href = "/main";
        } else {
          console.error("Failed to update profile.");
          // Handle error scenario
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle error scenario
      }
    };
    saveData();
  };

  const handleLogOut = () => {
    localStorage.clear();

  };

  return (
    <main className={styles.main}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <Link href={"/main"}>
            <img src="Picture1.jpg" alt="" />
          </Link>
        </div>
        <div className={styles.navbtn}>
          <Link href={"/"}>
            <button onClick={handleLogOut} className={styles.btn}>Log out</button>
          </Link>
        </div>
      </nav>
      <div className={styles.details}>
        <div className={styles.credentials}>
          <div className={styles.header}>
            <h1>Profile</h1>
          </div>
          <div className={styles.credential}>
            <div className={styles.credbox1}>
              <form action="">
                <label>Name:</label>
                <br />
                <input type="text" value={name || ""} disabled />
                <br />
                <label>Email</label>
                <br />
                <input type="email" value={email || ""} disabled />
                <br />
                <label>Phone Number:</label>
                <br />
                <input
                  pattern="[0-9]*"
                  inputMode="numeric"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </form>
              {showSaveButton && (
                <button className={styles.btn} onClick={handleSaveClick}>
                  Save
                </button>
              )}
            </div>
            <div className={styles.credbox2}>
              <form action="">
                <label>Github:</label>
                <br />
                <input
                  type="text"
                  value={github}
                  onChange={handleGithubChange}
                />
                <br />
                <label>LinkedIn:</label>
                <br />
                <input
                  type="text"
                  value={linkedIn}
                  onChange={handleLinkedInChange}
                />
                <br />
                <label>Role:</label>
                <br />
                <input type="text" value={role || ""} disabled />
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
