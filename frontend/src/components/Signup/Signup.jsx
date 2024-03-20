import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async () => {
    if (!validateInput(formData)) return;

    try {
      setIsLoading(true);
      const data = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };
      const res = await axios.post(
        `http://localhost:8081/api/v1/register`,
        data
      );
      if (res.status === 201) {
        toast.success("Registered Successfully");
      }
      navigate("/login");
    } catch (e) {
      if (e.response && e.response.status === 500) {
        toast.error(e.response.data.message);
      } else {
        toast.error(
          "Something went. Check that the backend is running, reachable and return valid JSON."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };
  const validateInput = (data) => {
    const { email, username, password } = data;

    if (!email) {
      toast.error("email is a required field");
      return false;
    }

    if (!username) {
      toast.error("Username is a required field");
      return false;
    }

    if (username.length < 6) {
      toast.error("Username must be at least 6 characters");
      return false;
    }

    if (!password) {
      toast.error("Password is a required field", { variant: "error" });
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters", {
        variant: "error",
      });
      return false;
    }

    return true;
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="signup">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 column d-flex justify-content-center align-items-center">
              <ToastContainer />
              <div className="d-flex flex-column w-100 p-5">
                <input
                  className="p-2 my-3"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <input
                  className="p-2 my-3"
                  type="text"
                  name="email"
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <input
                  className="p-2 my-3"
                  type="text"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button className="btn-signup p-2" onClick={handleRegister}>
                  {isLoading ? (
                    <>
                      <p> Loading...</p>
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </button>
                <p className="mb-0 my-4">
                  Already have an account?{" "}
                  <Link
                    aria-current="page"
                    to="/login"
                    className="text-black-50 fw-bold"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
            <div
              className="col-lg-4 d-flex justify-content-center align-items-center"
              style={{ height: "100vh" }}
            >
              <h1 className="text-center sign-up-heading">
                Sign <br /> Up
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
