import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import './Register.css';
import Icon from './unlock.png';
import LoadingBar from 'react-top-loading-bar'; // Import the LoadingBar component

function Register() {
  const ref = useRef(null);
  const [cookies] = useCookies(["cookie-name"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Start the loading bar immediately
      ref.current.staticStart();

      const { data } = await axios.post(
        "http://localhost:4000/register",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          // Simulate loading completion after 3 seconds
          setTimeout(() => {
            ref.current.complete();
          }, 3000);

          // Display the page content after 2 seconds of loading
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <LoadingBar color="#000000" ref={ref} /> {/* Add the LoadingBar component */}
      <form autoComplete="false" onSubmit={(e) => handleSubmit(e)}>
      <div className="screen-1">
        <img src={Icon}/>
        <div className="name">
          <div className="sec-2">
            <ion-icon name="text-outline"></ion-icon>
            <input autoComplete="off" type="name" name="name" placeholder="Enter Name"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
        </div>
        <div className="email">
          <div className="sec-2">
            <ion-icon name="mail-outline"></ion-icon>
            <input autoComplete="off" type="email" name="email" placeholder="Enter your email" onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            } />
          </div>
        </div>
        <div className="password">
          <div className="sec-2">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input autocomplete="off" className="pas" type="password" name="password" placeholder="Enter password" onChange={(e) =>
              setValues({ ...values, [e.target.name]: e.target.value })
            } />
          </div>
        </div>
        <button type="submit" className="register">Register </button>
        <div className="footer">Already have an account?<Link to="/login">Login</Link></div>
      </div>
    </form>
    </>
  );
}

export default Register;
