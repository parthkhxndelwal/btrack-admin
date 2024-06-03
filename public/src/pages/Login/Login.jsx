import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import LoadingBar from 'react-top-loading-bar'; // Import the LoadingBar component
import './Login.css';
import UnlockPNG from './unlock.png';

function Login() {
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  const ref = useRef(null); // Create a ref for the LoadingBar
  
  useEffect(() => {
    ref.current.complete();
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error) =>
    toast.error(error, {
      position: "bottom-right",
    });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) {generateError(email); ref.current.complete();}
          else if (password) {generateError(password); ref.current.complete();}
        } else {
          setTimeout(() => {
            navigate("/");
          }, 500);
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <>
      <LoadingBar waitingTime={2000} height={5} color='#3e4684' ref={ref} />
      <form autoComplete="false" onSubmit={(e) => handleSubmit(e)}>
        <div className="screen-1">
          <img src={UnlockPNG} alt="" />
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
              <input autoComplete="off" className="pas" type="password" name="password" placeholder="Enter password" onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              } />
            </div>
          </div>
          <button type="submit" className="login">Login </button>
          <div className="footer">Don't have an account?<Link to="/register">Sign Up</Link></div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
}

export default Login;
