import React, { useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../API/apiCalls";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = { name, email, password };
      const data = await registerUser(userData);
      console.log("Registration Successful", data);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Registration Failed:", error.message);
    }
  };

  return (
    <div id="register">
      <form className="form" onSubmit={handleSubmit}>
        <p id="heading">Register</p>
        <div className="field">
          <input
            autoComplete="off"
            placeholder="Username"
            className="input-field"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="field">
          <input
            autoComplete="off"
            placeholder="Email"
            className="input-field"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            Register
          </button>
          <button className="button" type="button" onClick={handleClick}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
