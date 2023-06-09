import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./loginform.css";
import { config } from "../../config";
export const LoginPageView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const baseUrl = config.BASE_URL;

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const res = await fetch(`${baseUrl}/user/signin`, {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (res.ok) {
        navigate("/performance");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-div">
      <div className="login-form">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />

        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        <div>
          <button className="to-register-button">
            <Link to="/register" className="button-link">
              Register
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
