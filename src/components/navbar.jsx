import React from "react";
import "./navbar.css";
import logoIcon from "../assets/icons/car-logo (1).svg";
import searchIcon from "../assets/icons/Group 159.svg";
import notificationIcon from "../assets/icons/Icon.svg";
import profileIcon from "../assets/icons/profile.svg";
import chevronIcon from "../assets/icons/vector (2).svg";

const Navbar = ({ username = "Hager" }) => {
  return (
    <div className="navbar">

      <div className="navbar-logo">
        <img src={logoIcon} className="logo-icon" />
        <span className="logo-text">Rently</span>
      </div>

      <div className="navbar-search">
        <img src={searchIcon} className="search-icon"/>
        <input type="text" placeholder="Search..." />
      </div>

      <div className="navbar-right">
        <img src={notificationIcon} className="nav-icon" />

        <div className="profile-box">
          <img src={profileIcon} className="profile-icon" />
          <span className="username">{username}</span>
          <img src={chevronIcon} className="chevron-icon" />
        </div>
      </div>

    </div>
  );
};

export default Navbar;