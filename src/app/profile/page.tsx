"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Profile() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputPhoneNumber = e.target.value;
    setPhoneNumber(inputPhoneNumber);

    // Check if the input phone number is 10 digits long
    setShowSaveButton(inputPhoneNumber.length === 10);
  };

  const handleSaveClick = () => {
    // Handle save action here
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
            <button className={styles.btn}>Log out</button>
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
                <input type="text" disabled />
                <br />
                <label>Email</label>
                <br />
                <input type="email" disabled />
                <br />
                <label>Phone Number:</label>
                <br />
                <input
                  type="text"
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
                <input type="text" disabled />
                <br />
                <label>Linkedln:</label>
                <br />
                <input type="text" disabled />
                <br />
                <label>Role:</label>
                <br />
                <input type="text" disabled placeholder="Student" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
