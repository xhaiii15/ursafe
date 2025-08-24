import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/AddDiary.module.css";

function AddDiary({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // JWT token from login
      const res = await axios.post(
        "http://localhost:5000/api/posts/create",
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Clear form
      setTitle("");
      setDescription("");

      // Let parent know we created a new post
      if (onPostCreated) onPostCreated(res.data.post);
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Add New Diary</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Write your diary here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default AddDiary;
