import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div id="nav">
      {/* <Link to="/dashboard" className="link">
        <p>Dashboard</p>
      </Link> */}
      <Link to="/Agencies" className="link">
        <p>Agencies</p>
      </Link>
      <Link to="/Clients" className="link">
        <p>Clients</p>
      </Link>
      <Link to="/top-clients" className="link">
        <p>Top-Clients</p>
      </Link>
    </div>
  );
};

export default Navbar;
