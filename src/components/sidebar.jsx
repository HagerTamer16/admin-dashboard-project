import React from "react";
import "./sidebar.css";
import { NavLink } from "react-router-dom";
import dashboardIcon from "../assets/icons/dashboard.svg";
import usersIcon from "../assets/icons/user.svg";
import carsIcon from "../assets/icons/car (1).svg";
import paymentIcon from "../assets/icons/payment.svg";
import bookingIcon from "../assets/icons/booking.svg";
import requestIcon from "../assets/icons/request.svg";
import logoutIcon from "../assets/icons/Log out.svg";

const Sidebar = ({ active = "Dashboard" }) => {

  const navItems = [
    { name: "Dashboard", icon: dashboardIcon },
    { name: "Users", icon: usersIcon },
    { name: "Cars", icon: carsIcon },
    { name: "Payment", icon: paymentIcon },
    { name: "Booking", icon: bookingIcon },
    { name: "Request", icon: requestIcon },
    
  ];

  return (
    <div className="sidebar">
      <div className="menu">

        {navItems.map((item) => (
          <div
            className={`menu-item ${active === item.name ? "active" : ""}`}
            key={item.name}
          >
            <img src={item.icon} />
            <span>{item.name}</span>
          </div>
        ))}

        <div className="menu-item add-admin">
          <span className="plus">+</span>
          <span>Add Admin</span>
        </div>

      </div>
       
      <div className="logout">
        <img src={logoutIcon} />
        <span>Log out</span>
      </div>

    </div>
  );
};

export default Sidebar;