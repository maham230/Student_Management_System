import React, { useState, useEffect } from "react";

import {
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";

import {
  auth,
  googleProvider
} from "../firebase";

import { useAuth0 } from "@auth0/auth0-react";

import "./Login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    loginWithRedirect,
    isAuthenticated
  } = useAuth0();

  // After successful Auth0 login, go to Dashboard
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/dashboard";
    }
  }, [isAuthenticated]);

  // Firebase Email Login
  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      window.location.href = "/dashboard";

    } catch (error) {
      alert(error.message);
    }
  };

  // Google Login
  const googleLogin = async () => {
    try {
      await signInWithPopup(
        auth,
        googleProvider
      );

      window.location.href = "/dashboard";

    } catch (error) {
      alert(error.message);
    }
  };

  // Auth0 Login
  const auth0Login = async () => {
  try {
    await loginWithRedirect({
      authorizationParams: {
        prompt: "login"
      }
    });
  } catch (error) {
    console.error("Auth0 Login Error:", error);
    alert(error.message);
  }
};

  return (
    <div className="login-page">

      <div className="login-card">

        {/* Logo */}
        <div className="logo-circle">
          🎓
        </div>

        <h1>Student Management</h1>

        <p className="subtitle">
          Login to manage your student records
        </p>

        {/* Email */}
        <div className="input-group">
          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="input-group">
          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Firebase Login */}
        <button
          className="login-btn"
          onClick={login}
        >
          Login
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        {/* Google Login */}
        <button
          className="google-btn"
          onClick={googleLogin}
        >
          <span>🔵</span>
          Continue with Google
        </button>

        {/* Auth0 Login */}
        <button
          className="auth0-btn"
          onClick={auth0Login}
        >
          <span>🔐</span>
          Continue with Auth0
        </button>

        {/* Register */}
        <p className="register-text">
          Don't have an account?
        </p>

        <button
          className="register-btn"
          onClick={() =>
            window.location.href = "/register"
          }
        >
          Create an Account
        </button>

      </div>

    </div>
  );
}

export default Login;