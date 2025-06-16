import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { FaPlusSquare } from "react-icons/fa";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleColorMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    document.body.className = isDarkMode ? "light-mode" : "dark-mode"; 
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="logo">
          <Link to="/">Product Store 🛒</Link>
        </div>

        <div className="actions">
          <Link to="/create">
            <button className="action-button">
              <FaPlusSquare size={20} />
            </button>
          </Link>
          <button className="action-button" onClick={toggleColorMode}>
            {isDarkMode ? <LuSun size={20} /> : <IoMoon size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
