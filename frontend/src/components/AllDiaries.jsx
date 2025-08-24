import React, { useEffect, useState } from "react";
import axios from "axios";

function AllDiaries({ newPost }) {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // for modal
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Fetch posts (now reusable)
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Add new post instantly
  useEffect(() => {
    if (newPost) {
      setPosts((prev) => [newPost, ...prev]);
    }
  }, [newPost]);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts((prev) => prev.filter((post) => post._id !== id));
      setSelectedPost(null); // close modal if deleted
    } catch (error) {
      console.error("Error deleting post:", error.response?.data || error.message);
    }
  };

  // Handle update
  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/posts/${selectedPost._id}`,
        {
          title: editTitle,
          description: editDescription,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Re-fetch posts to update UI instantly
      await fetchPosts();
      setSelectedPost(null); // close modal after save
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div>
      <h2>All Diaries</h2>
      {posts.length === 0 ? (
        <p>No diaries yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              cursor: "pointer",
              borderRadius: "8px",
              height: "120px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() => {
              setSelectedPost(post);
              setEditTitle(post.title);
              setEditDescription(post.description);
              setEditing(false);
            }}
          >
            <h3
              style={{
                margin: "0 0 8px 0",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {post.title}
            </h3>
            <p
              style={{
                flexGrow: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {post.description}
            </p>
            <small>{new Date(post.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}

      {/* Modal for full post */}
      {selectedPost && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setSelectedPost(null)}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "600px",
              width: "90%",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {editing ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows="6"
                  style={{ width: "100%", marginBottom: "10px" }}
                />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setEditing(false)}>Cancel</button>
              </>
            ) : (
              <>
                <h2>{selectedPost.title}</h2>
                <p style={{ whiteSpace: "pre-wrap" }}>{selectedPost.description}</p>
                <small>
                  {selectedPost.createdAt
                    ? new Date(selectedPost.createdAt).toLocaleString()
                    : ""}
                </small>
                <br />
                <button onClick={() => setEditing(true)}>Update</button>
                <button
                  onClick={() => handleDelete(selectedPost._id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Delete
                </button>
                <button
                  onClick={() => setSelectedPost(null)}
                  style={{ marginLeft: "10px" }}
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AllDiaries;
