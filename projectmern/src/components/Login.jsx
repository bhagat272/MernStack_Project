import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../App";

const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const { loginName, setLoginName } = useContext(UserContext);

  function handleform(e) {
    e.preventDefault();
    
    fetch("https://mern-stack-project-rosy.vercel.app/checkuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.user && data.user._id) {
          localStorage.setItem("loginName", data.user.userName);
          setLoginName(localStorage.getItem("loginName")); // Update the context value

          if (data.user.userName === "admin") {
            toast.success("Welcome Admin", {
              duration: 1800,
            });
            navigate("/admin");
          } else {
            toast.success(`Welcome User`, {
              duration: 2500,
            });
            navigate("/products");
          }
        } else if (data.message) {
          toast.error("Contact admin");
        } else {
          toast.error("User not found");
        }
      })
      .catch((err) => {
        console.error("Error during API call:", err);
        toast.error("An error occurred. Please try again later.");
      });
  }

  return (
    <div className="form-container">
      <Toaster />
      <form className="form" onSubmit={handleform}>
        <h2 className="text-center text-2xl font-bold">LOGIN</h2>
        <hr />
        <div className="mb-3 text-center">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            UserName
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />
          <div className="mb-3 text-center">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleFormControlInput1"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              placeholder="Enter your password"
              name="ename"
            />
            <Button
              variant="contained"
              type="submit"
              
              className="mt-3 form-control bg-success"
            >
              LOGIN
            </Button>
            <p className="mt-4 text-warning">
              New User?{" "}
              <Link to={"/"}>
                <u>Create Account</u>
              </Link>
            </p>
          </div>
        </div> 
      </form>
    </div>
  );
};

export default Login;
