import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const isLoggedIn = localStorage.getItem("token");

  return (
    <>
      <div className="home d-flex justify-content-center align-items-center">
        <div className="container d-flex justify-content-center align-items-center flex-column">
          <h1 className="text-center">
            Organize your <br /> work and life, finally.
          </h1>
          <p>
            Become focused, organized and calm with todo app. The worlds I task
            manager app.
          </p>
          {!isLoggedIn ? (
            <p className="home-btn">Please Login To Make Todo List</p>
          ) : (
            <Link to="/todos">
              <button className="home-btn">MAKE TODO LIST</button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
