// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import Avatar from "../images/avatar15.jpg";
// import EditNoteIcon from "@mui/icons-material/EditNote";
// import CheckIcon from "@mui/icons-material/Check";

// const UserProfile = () => {
//   const [selectedAvatar, setSelectedAvatar] = useState(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");

//   return (
//     <section className="profile">
//       <div className="container profile__container">
//         <Link to={`/posts/sdfsdsd`} className="btn">
//           My Posts
//         </Link>

//         <div className="profile__details">
//           <div className="avatar__wrapper">
//             <div className="profile__avatar">
//               <img src={Avatar} alt="" />
//             </div>
//             <form action="" className="avatar__form">
//               <input
//                 type="file"
//                 name="avatar"
//                 id="avatar"
//                 onChange={(e) => setSelectedAvatar(e.target.files[0])}
//                 accept="image/png, image/jpg, image/jpeg"
//               />
//               <label htmlFor="avatar">
//                 <EditNoteIcon />
//               </label>
//             </form>
//             <button className="profile__avatar-btn">
//               <CheckIcon />
//             </button>
//           </div>
//           <h1>{name}</h1>
//           <form className="form profile__form">
//             <p className="form__error-message">This is an error message</p>
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <input
//               type="text"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="Current Password"
//               value={currentPassword}
//               onChange={(e) => setCurrentPassword(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="New Password"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="Confirm Password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//             <button type="submit" className="btn primary">
//               Update details
//             </button>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default UserProfile;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../images/avatar15.jpg";
import EditNoteIcon from "@mui/icons-material/EditNote";
import CheckIcon from "@mui/icons-material/Check";

const UserProfile = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("User details update is not available in the current scope.");
  };

  return (
    <section className="profile">
      <div className="container profile__container">
        <Link to={`/posts`} className="btn">
          My Posts
        </Link>

        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar">
              <img
                src={
                  selectedAvatar ? URL.createObjectURL(selectedAvatar) : Avatar
                }
                alt=""
              />
            </div>
            <form action="" className="avatar__form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => setSelectedAvatar(e.target.files[0])}
                accept="image/png, image/jpg, image/jpeg"
              />
              <label htmlFor="avatar">
                <EditNoteIcon />
              </label>
            </form>
            <button className="profile__avatar-btn">
              <CheckIcon />
            </button>
          </div>
          <h1>{name}</h1>
          <form className="form profile__form" onSubmit={handleSubmit}>
            {error && <p className="form__error-message">{error}</p>}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit" className="btn primary">
              Update details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
