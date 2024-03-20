import React, { useState } from "react";
import { GiBlackBook } from "react-icons/gi";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  console.log(username);
  console.log(isLoggedIn);

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <b>
              <GiBlackBook /> &nbsp; TODOS
            </b>
          </Link>
          {/* Navbar toggler for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* Conditional rendering based on user login status */}
              {isLoggedIn ? (
                <>
                  {/* Show user profile image and logout button */}
                  <li className="nav-item mx-2"></li>
                  <p className="p-tag">{username}</p>
                  <li className="nav-item mx-2">
                    <Link
                      className="nav-link active btn-nav"
                      aria-current="page"
                      onClick={() => {
                        localStorage.removeItem("token"); // Clear token from localStorage
                        window.location.reload(); // Reload the page
                      }}
                      to="/login"
                    >
                      LOGOUT
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item mx-2">
                    <Link
                      className="nav-link active btn-nav"
                      aria-current="page"
                      to="/signup"
                    >
                      REGISTER
                    </Link>
                  </li>
                  <li className="nav-item mx-2">
                    <Link
                      className="nav-link active btn-nav"
                      aria-current="page"
                      to="/login"
                    >
                      LOGIN
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
