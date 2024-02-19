import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch the specific post using the provided API
    fetch(`https://dummyjson.com/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => setPost(data));
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <section className="post-detail">
      <div className="container post-detail__container">
        <div className="post-detail__header">
          <h1>{post.title}</h1>
          <div className="post-detail__buttons">
            <Link to={`/posts/${postId}/edit`} className="btn sm primary">
              Edit
            </Link>
            <Link to={`/posts/${postId}/delete`} className="btn sm danger">
              Delete
            </Link>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: post.body }}
          className="post-detail__body"
        />
      </div>
    </section>
  );
};

export default PostDetail;
