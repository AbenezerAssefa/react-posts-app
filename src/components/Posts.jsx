import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import "../components/Posts.css";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const history = useNavigate();

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.posts && Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          setErrorMessage("Unexpected response format for posts");
        }
      })
      .catch((error) => {
        setErrorMessage("Error fetching posts. Please try again later.");
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handleSearch = () => {
    const lowercaseQuery = searchQuery.toLowerCase();
    const filteredData = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.body.toLowerCase().includes(lowercaseQuery)
    );
    setPosts(filteredData);
  };

  const handleReact = (postId, currentReactions) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, reactions: currentReactions + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleDelete = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);

    history("/posts");
  };

  return (
    <div className="container">
      <Typography variant="h2" className="heading">
        <span className="word1">Welcome</span>
        <span className="word2">to</span>
        <span className="word3">My</span>
        <span className="word4">Artistic</span>
        <span className="word5">Blog</span>
      </Typography>

      <div className="searchContainer">
        <TextField
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="searchTextField"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          className="searchButton"
        >
          Search
        </Button>
      </div>

      {errorMessage && (
        <Typography variant="body1" className="errorMessage">
          {errorMessage}
        </Typography>
      )}

      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item key={post.id} xs={12} md={4}>
            <Paper className="postContainer" elevation={9}>
              <Typography variant="h5" className="postTitle">
                <Link to={`/posts/${post.id}`} className="link">
                  {post.title}
                </Link>
              </Typography>
              <Typography variant="body2" className="postInfo">
                Author: User {post.userId}
              </Typography>
              <Typography variant="body2" className="postInfo">
                Tags: {post.tags.join(", ")}
              </Typography>
              <Typography variant="body2" className="postInfo">
                Reactions: {post.reactions}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className="reactButton"
                onClick={() => handleReact(post.id, post.reactions)}
              >
                React
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className="deleteButton"
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

export default Posts;
