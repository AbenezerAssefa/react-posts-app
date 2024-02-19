import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DeletePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/posts/${id}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Post deleted successfully");
        setIsDeleted(true);

        navigate("/posts");
      } else {
        console.error("Error deleting post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="delete-post">
      {post ? (
        <div>
          <h2>Delete Post</h2>
          <p>Are you sure you want to delete the post "{post.title}"?</p>
          <button onClick={handleDelete} className="btn danger">
            Delete
          </button>
          <button onClick={() => navigate(`/posts/${id}`)} className="btn">
            Cancel
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {isDeleted && <p>Post deleted successfully!</p>}
    </div>
  );
};

export default DeletePost;
