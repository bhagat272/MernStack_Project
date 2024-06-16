import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

const Reg = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
 const[message,setmessage]=useState("")
  function handleform(e) {
    e.preventDefault();
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.record && data.record._id) {
          toast.success("User Registered Successfully");
        } else if(data.message) {
          console.log(data.message)
          toast("User already Registered",{
            icon :"🤔"
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        
      });
  }

  return (
    <div className="form-container">
      <Toaster />
      <form className="form" onSubmit={handleform}>
        <h2 className="text-center text-2xl font-bold">REGISTRATION</h2>
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
              name="password"
            />
             <Button
              variant="contained"
              type="submit"
              className="mt-3 form-control bg-success"
            >
              REGISTER
            </Button>
            <Link to="/login">
              <Button
                variant="contained"
                type="submit"
                className="mt-3 form-control bg-secondary"
              >
                LOGIN
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Reg;
