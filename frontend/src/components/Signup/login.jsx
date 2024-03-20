import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    if (!validateInput(formData)) {
      return;
    }

    try {
      setIsLoading(true);
      const data = {
        email: formData.email,
        password: formData.password,
      };
      const response = await axios.post(
        `http://localhost:8081/api/v1/login`,
        data
      );
      if (response.status === 200) {
        toast.success("User logged in successfully");
        localStorage.setItem("token", response?.data?.token);
        navigate("/");
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const validateInput = (data) => {
    if (!data.email || !data.password) {
      toast.error("Email and password are required fields.");
      return false;
    }

    return true;
  };

  return (
    <>
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 column d-flex justify-content-center align-items-center">
              <div className="d-flex flex-column w-100 p-5">
                <ToastContainer />
                <input
                  className="p-2 my-3"
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <input
                  className="p-2 my-3"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button onClick={handleLogin} className="btn-signup p-2">
                  Sign In
                </button>
                <p className="mb-0 my-4">
                  Don't have an account ?{" "}
                  <Link
                    aria-current="page"
                    to="/signup"
                    className="text-black-50 fw-bold"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
            <div
              className="col-lg-4 d-flex justify-content-center align-items-center"
              style={{ height: "100vh" }}
            >
              <h1 className="text-center sign-up-heading">
                Sign <br /> In
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
