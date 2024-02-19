import { Routes, Route } from "react-router-dom";
import "./index.css";

import Posts from "./components/Posts";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import PostDetail from "./components/PostDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Authors from "./pages/Authors";
import CreatePost from "./pages/CreatePost";
import CategoryPosts from "./pages/CategoryPosts";
import AuthorPosts from "./pages/AuthorPosts";
import Dashboard from "./pages/Dashboard";
import EditPost from "./pages/EditPost";
import DeletePost from "./pages/DeletePost";
import Logout from "./pages/Logout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="posts" element={<Posts />} />
        {/* Use a nested route for post details */}
        <Route path="posts/:id" element={<PostDetail />}>
          <Route index element={<Posts />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="profile/:id" element={<UserProfile />} />
        <Route path="authors" element={<Authors />} />
        <Route path="create" element={<CreatePost />} />
        <Route path="posts/categories/:category" element={<CategoryPosts />} />
        <Route path="posts/users/:id" element={<AuthorPosts />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="posts/:id/edit" element={<EditPost />} />
        <Route path="posts/:id/delete" element={<DeletePost />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

export default App;
