import React, { useState } from "react";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("Login successful!");
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        setError(
          errorData.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login">
      <div className="container">
        <Typography variant="h5">Sign In</Typography>
        <form className="form login__form" onSubmit={submitHandler}>
          {error && <Typography color="error">{error}</Typography>}
          <TextField
            type="email"
            label="Email"
            name="email"
            value={userData.email}
            onChange={changeInputHandler}
            fullWidth
            autoFocus
            margin="normal"
          />
          <TextField
            type="password"
            label="Password"
            name="password"
            value={userData.password}
            onChange={changeInputHandler}
            fullWidth
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            style={{ marginTop: "16px" }}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
        <Typography variant="body2" style={{ marginTop: "16px" }}>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </Typography>
      </div>
    </section>
  );
};

export default Login;
