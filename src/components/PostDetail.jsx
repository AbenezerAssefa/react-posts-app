import React, { useState, useEffect } from "react";
import { Button, Paper, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the specific post using the provided API
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [id]);

  // Return null if post is still loading
  if (!post) {
    return <div>Loading...</div>;
  }

  const handleReact = (postId, reactions) => {
    // Handle the reaction logic here
    console.log(`Reacting to post ${postId}`);
  };

  const handleDelete = (postId) => {
    // Handle the delete logic here
    console.log(`Deleting post ${postId}`);
    // You can also perform the redirect logic here if needed
    navigate("/posts");
  };

  return (
    <Paper style={styles.postDetailContainer} elevation={3}>
      <Typography variant="h4" style={styles.postTitle}>
        {post.title}
      </Typography>
      <Typography variant="body1" style={styles.postBody}>
        {post.body}
      </Typography>
      <Typography variant="body2" style={styles.postInfo}>
        Author: User {post.userId}
      </Typography>
      <Typography variant="body2" style={styles.postInfo}>
        Tags: {post.tags.join(", ")}
      </Typography>
      <Typography variant="body2" style={styles.postInfo}>
        Reactions: {post.reactions}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleReact(id, post.reactions)}
        style={styles.reactButton}
      >
        React
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => handleDelete(id)}
        style={styles.deleteButton}
      >
        Delete
      </Button>
    </Paper>
  );
};

const styles = {
  container: {
    margin: "50px",
  },
  heading: {
    color: "#333",
    textAlign: "center",
  },
  postContainer: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    height: "100%",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: "#f0f0f0",
    },
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
  postTitle: {
    marginBottom: "10px",
  },
  postInfo: {
    color: "#888",
    marginBottom: "5px",
  },
  postDetailContainer: {
    margin: "50px",
    padding: "20px",
  },
  postBody: {
    lineHeight: "1.6",
    marginBottom: "10px",
  },
  reactButton: {
    marginTop: "10px",
    marginRight: "10px",
  },
  deleteButton: {
    marginTop: "10px",
    backgroundColor: "#ff6961",
    "&:hover": {
      backgroundColor: "#d44a3a",
    },
  },
};

export default PostDetail;
