import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const history = useNavigate();

  useEffect(() => {
    // Fetch all posts using the provided API
    fetch("https://dummyjson.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data.posts));
  }, []);

  const handleSearch = () => {
    // Filter posts based on search query
    const lowercaseQuery = searchQuery.toLowerCase();
    const filteredData = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.body.toLowerCase().includes(lowercaseQuery)
    );
    setPosts(filteredData);
  };

  const handleReact = (postId, currentReactions) => {
    // Simulate adding a reaction (increase the number of reactions)
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, reactions: currentReactions + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleDelete = (postId) => {
    // Simulate deleting a post
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);

    // Redirect to the main '/posts' page after deleting
    history("/posts");
  };

  return (
    <div style={styles.container}>
      <Typography variant="h2" style={styles.heading}>
        Welcome to My Blog
      </Typography>

      <div style={styles.searchContainer}>
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchTextField}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          style={styles.searchButton}
        >
          Search
        </Button>
      </div>

      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item key={post.id} xs={12} md={4}>
            <Paper style={styles.postContainer} elevation={3}>
              <Typography variant="h5" style={styles.postTitle}>
                <Link to={`/posts/${post.id}`} style={styles.link}>
                  {post.title}
                </Link>
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
                style={styles.reactButton}
                onClick={() => handleReact(post.id, post.reactions)}
              >
                React
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={styles.deleteButton}
                onClick={() => handleDelete(post.id)}
              >
                Delete
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const styles = {
  container: {
    marginTop: "100px",
    marginLeft: "20px",
    marginRight: "20px",
  },
  heading: {
    color: "#333",
    textAlign: "center",
  },

  searchContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px", // Add margin to the search container
  },
  searchTextField: {
    marginRight: "10px", // Add margin to the right of the TextField
  },
  searchButton: {
    marginLeft: "10px", // Add margin to the left of the Button
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

export default Posts;
