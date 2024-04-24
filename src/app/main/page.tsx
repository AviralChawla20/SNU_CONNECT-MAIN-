"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { emitWarning } from "process";
import { supabase } from "../../../utils/supabase/client";

interface Tweet {
  tweet: string;
  title: string;
  name: string;
}

interface newTweet {
  tweet: string;
  title: string;
  email: string;
}

export default function Main() {
  const email = localStorage.getItem("email") || "";
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [tweets, setTweets] = useState<Tweet[]>([]); // State to hold the fetched tweets
  const [newTweets, setNewTweets] = useState<newTweet[]>([]); // State to hold the new tweets
  const [title, setTitle] = useState(""); // State for the title input
  const [content, setContent] = useState(""); // State for the content input

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/tweets", { method: "GET" });
        if (response.ok) {
          const data = await response.json();
          setTweets((data as Tweet[]).reverse()); // Set the fetched tweets in state
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const fetchProfileData = async () => {
      try {
        const response = await fetch("/api/profile?email=" + email, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          localStorage.setItem("role", data.role);
          // console.log(role)
        } else {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchProfileData();
    fetchUserData(); // Call the fetchUserData function when component mounts
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Create a new tweet object with the title and content
    const newTweet: newTweet = {
      title: title,
      tweet: content,
      email: email, // You can replace this with the user's name if available
    };

    // Update the state with the new tweet
    setNewTweets([...newTweets, newTweet]);

    // Reset the form fields
    setTitle("");
    setContent("");

    // Optional: Send the new tweet data to the server for saving in the database
    try {
      const response = await fetch("/api/tweets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTweet),
      });
      if (!response.ok) {
        throw new Error("Failed to save tweet");
      }
    } catch (error) {
      console.error("Error saving tweet:", error);
    }
    window.location.reload();
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputSearch = e.target.value;
    if (inputSearch.length === 0) {
      setSearchResults([]); // Clear search results if search input is empty
      return;
    }
    console.log(inputSearch);
    let { data: users, error } = await supabase
      .from("users")
      .select("name")
      .ilike("name", `${inputSearch}%`);

    if (users) {
      console.log(users);
      setSearchResults(users);
      // console.log("Emty")
    } else {
      console.error(error);
      setSearchResults([]);
    }
  };

  return (
    <main className={styles.main}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <img src="Picture1.jpg" alt="" />
        </div>
        <div className={styles.searchbar}>
          <form action="">
            <input onChange={handleSearch} type="text" placeholder="Search" />
          </form>
          {searchResults.length > 0 && (
            <div className={styles.searchResults}>
              <ul>
                {searchResults.map((user, index) => (
                  <li key={index}>{user.name}</li>
                ))}
              </ul>
            </div>
          )}
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
        <div className={styles.section1}>
          <div className={styles.header}>
            <h1>Tweets</h1>
          </div>
          <div className={styles.tweets}>
            {tweets.map((tweet, index) => (
              <div key={index} className={styles.tweet}>
                <h2>{tweet.name}</h2>
                <h4>{tweet.title}</h4>
                <p>{tweet.tweet}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.section2}>
          <div className={styles.header}>
            <h1>What&apos;s on your mind</h1>
          </div>
          <div className={styles.blog}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="title">Title:</label>
              <br />
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <br />
              <label htmlFor="content">Content:</label>
              <br />
              <textarea
                id="content"
                name="content"
                cols={30}
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
              <br />
              <button className={styles.btn} type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
