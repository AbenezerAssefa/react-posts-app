// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import PostItem from "../components/PostItem";
// import { Dummy_Posts } from "../data";

// const AuthorPosts = () => {
//   const [posts, setPosts] = useState(Dummy_Posts);
//   return (
//     <section className="posts">
//       {posts.length > 0 ? (
//         <div className="container posts__container">
//           {posts.map(({ id, thumbnail, category, title, desc, authorID }) => (
//             <Link to={`/posts/${id}`} key={id}>
//               <PostItem
//                 thumbnail={thumbnail}
//                 postID={id}
//                 category={category}
//                 title={title}
//                 description={desc}
//                 authorID={authorID}
//               />
//             </Link>
//           ))}
//         </div>
//       ) : (
//         <h2 className="center">No posts founds</h2>
//       )}
//     </section>
//   );
// };

// export default AuthorPosts;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PostItem from "../components/PostItem";

const AuthorPosts = () => {
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

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map(
            ({ id, thumbnail, category, title, content, reactions }) => (
              <Link to={`/posts/${id}`} key={id}>
                <PostItem
                  thumbnail={thumbnail}
                  postID={id}
                  category={category}
                  title={title}
                  description={content}
                  reactions={reactions}
                />
              </Link>
            )
          )}
        </div>
      ) : (
        <h2 className="center">No posts found</h2>
      )}
    </section>
  );
};

export default AuthorPosts;
