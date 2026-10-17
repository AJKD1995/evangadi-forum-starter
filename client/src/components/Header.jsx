import React from "react";
import { Link } from "react-router";
import "../App.css";

function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-evang">EVANG</span>
          <span className="logo-adi">ADI</span>
        </Link>

        <nav className="main-nav">
          <Link to="/" className="nav-link">
            Home
          </Link>

          <Link to="/how-it-works" className="nav-link">
            How it works
          </Link>

          <Link to="/signin" className="nav-btn">
            SIGN IN
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;