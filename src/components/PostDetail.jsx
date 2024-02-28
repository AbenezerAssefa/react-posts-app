import React, { useState, useEffect } from "react";
import { Button, Paper, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import "../components/PostDetail.css";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://dummyjson.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Paper className="postDetailContainer" elevation={3}>
      <Typography variant="h4" className="postTitle">
        {post.title}
      </Typography>
      <Typography variant="body1" className="postBody">
        {post.body}
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
        onClick={() => navigate("/posts")}
        className="backButton"
      >
        Back
      </Button>
    </Paper>
  );
};

export default PostDetail;
