// import React, { useState } from "react";
// import { Dummy_Posts } from "../data";
// import { Link } from "react-router-dom";

// const Dashboard = () => {
//   const [posts, setPosts] = useState(Dummy_Posts);
//   return (
//     <section className="dashboard">
//       {posts.length ? (
//         <div className="container dashboard__container">
//           {posts.map((post) => {
//             return (
//               <article key={post.id} className="dashboard__post">
//                 <div className="dashboard__post-info">
//                   <div className="dashboard__post-thumbnail">
//                     <img src={post.thumbnail} alt="" />
//                   </div>
//                   <h5>{post.title}</h5>
//                 </div>
//                 <div className="dashboard__post-actions">
//                   <Link to={`/posts/${post.id}`} className="btn sm">
//                     View
//                   </Link>
//                   <Link
//                     to={`/posts/${post.id}/edit`}
//                     className="btn sm primary"
//                   >
//                     Edit
//                   </Link>
//                   <Link
//                     to={`/posts/${post.id}/delete`}
//                     className="btn sm danger"
//                   >
//                     Delete
//                   </Link>
//                 </div>
//               </article>
//             );
//           })}
//         </div>
//       ) : (
//         <h2 className="center">You have no posts yet</h2>
//       )}
//     </section>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/posts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`https://dummyjson.com/posts/${postId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
        console.log("Post deleted successfully");
      } else {
        console.error("Error deleting post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <section className="dashboard">
      {posts.length ? (
        <div className="container dashboard__container">
          {posts.map((post) => {
            return (
              <article key={post.id} className="dashboard__post">
                <div className="dashboard__post-info">
                  <div className="dashboard__post-thumbnail">
                    <img src={post.thumbnail} alt={post.title} />
                  </div>
                  <h5>{post.title}</h5>
                </div>
                <div className="dashboard__post-actions">
                  <Link to={`/posts/${post.id}`} className="btn sm">
                    View
                  </Link>
                  <Link
                    to={`/posts/${post.id}/edit`}
                    className="btn sm primary"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn sm danger"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <h2 className="center">You have no posts yet</h2>
      )}
    </section>
  );
};

export default Dashboard;
