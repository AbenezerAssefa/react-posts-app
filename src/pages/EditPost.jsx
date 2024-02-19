// import React, { useState } from "react";

// const EditPost = () => {
//   const [title, setTitle] = useState("");
//   const [category, setCategory] = useState("uncategorized");
//   const [description, setDescription] = useState("");
//   const [thumbnail, setThumbnail] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const POST_CATEGORIES = [
//     "Agriculture",
//     "Business",
//     "Education",
//     "Entertainment",
//     "Art",
//     "Investment",
//     "Uncategorized",
//     "Weather",
//   ];

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("category", category);
//     formData.append("description", description);

//     if (thumbnail) {
//       formData.append("thumbnail", thumbnail);
//     }

//     try {
//       await new Promise((resolve) => setTimeout(resolve, 1000));

//       const success = Math.random() < 0.8;

//       if (success) {
//         console.log("Post created successfully");
//       } else {
//         setErrorMessage("Error creating post. Please try again later.");
//       }
//     } catch (error) {
//       console.error("Error creating post", error);
//       setErrorMessage("Error creating post. Please try again later.");
//     }
//   };

//   return (
//     <section style={{ padding: "20px", backgroundColor: "#f4f4f4" }}>
//       <div style={{ maxWidth: "600px", margin: "auto" }}>
//         <h2 style={{ marginBottom: "20px", color: "#333" }}>Edit Post</h2>
//         {errorMessage && (
//           <p style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</p>
//         )}
//         <form onSubmit={handleSubmit}>
//           <label style={{ display: "block", marginBottom: "10px" }}>
//             Title:
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               style={{ width: "100%", padding: "8px" }}
//               autoFocus
//             />
//           </label>
//           <label style={{ display: "block", marginBottom: "10px" }}>
//             Category:
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               style={{ width: "100%", padding: "8px" }}
//             >
//               {POST_CATEGORIES.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </label>
//           <label style={{ display: "block", marginBottom: "10px" }}>
//             Posts:
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               style={{ width: "100%", padding: "8px" }}
//             />
//           </label>
//           <label style={{ display: "block", marginBottom: "10px" }}>
//             Thumbnail:
//             <input
//               type="file"
//               onChange={(e) => setThumbnail(e.target.files[0])}
//               accept="png, jpeg, jpg"
//               style={{ width: "100%", padding: "8px" }}
//             />
//           </label>
//           <button
//             type="submit"
//             style={{
//               backgroundColor: "#4caf50",
//               color: "white",
//               padding: "10px 15px",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             Update
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default EditPost;

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/posts/${id}`);
        const data = await response.json();
        setPost(data);
        setTitle(data.title);
        setCategory(data.category);
        setDescription(data.description);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const response = await fetch(`https://dummyjson.com/posts/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        console.log("Post updated successfully");

        navigate(`/posts/${id}`);
      } else {
        console.error("Error updating post");
        setErrorMessage("Error updating post. Please try again later.");
      }
    } catch (error) {
      console.error("Error updating post", error);
      setErrorMessage("Error updating post. Please try again later.");
    }
  };

  return (
    <section style={{ padding: "20px", backgroundColor: "#f4f4f4" }}>
      <div style={{ maxWidth: "600px", margin: "auto" }}>
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Edit Post</h2>
        {errorMessage && (
          <p style={{ color: "red", marginBottom: "10px" }}>{errorMessage}</p>
        )}
        {post ? (
          <form onSubmit={handleSubmit}>
            <label style={{ display: "block", marginBottom: "10px" }}>
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
                autoFocus
              />
            </label>
            <label style={{ display: "block", marginBottom: "10px" }}>
              Category:
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
              >
                {[
                  "Agriculture",
                  "Business",
                  "Education",
                  "Entertainment",
                  "Art",
                  "Investment",
                  "Uncategorized",
                  "Weather",
                ].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </label>
            <label style={{ display: "block", marginBottom: "10px" }}>
              Posts:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
              />
            </label>
            <label style={{ display: "block", marginBottom: "10px" }}>
              Thumbnail:
              <input
                type="file"
                onChange={(e) => setThumbnail(e.target.files[0])}
                accept="png, jpeg, jpg"
                style={{ width: "100%", padding: "8px" }}
              />
            </label>
            <button
              type="submit"
              style={{
                backgroundColor: "#4caf50",
                color: "white",
                padding: "10px 15px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Update
            </button>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
};

export default EditPost;
