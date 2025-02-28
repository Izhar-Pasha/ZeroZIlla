import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../API/apiCalls";
import { toast } from "react-toastify";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/register");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginData = { name, password };
      const data = await loginUser(loginData);
      if (data) {
        navigate("/Agencies");
      }
      toast.success("Login Successfull");
      console.log("Login Successful", data);
      setName("");
      setPassword("");
    } catch (error) {
      console.log("Login Failed:", error.message);
    }
  };

  return (
    <div id="login">
      <form className="form" onSubmit={handleSubmit}>
        <p id="heading">Login</p>
        <div className="field">
          <input
            autoComplete="off"
            placeholder="Username"
            className="input-field"
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <input
            placeholder="Password"
            className="input-field"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="btn">
          <button className="button" type="submit">
            Login
          </button>
          <button className="button" type="button" onClick={handleClick}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
