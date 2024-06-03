import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import LoadingBar from 'react-top-loading-bar';
import './Landing.css'

export default function Landing() {
  const ref = useRef(null);
  const [name, setName] = useState('User');
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication state
  const [email, setEmail] = useState('')
  useEffect(() => {
    ref.current.complete();
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
        return; // Early exit if no JWT cookie
      }

      try {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else {
          // toast(`Hi ${data.username} `, { theme: "dark" });
          setName(data.username);
          setIsAuthenticated(true); // Set authenticated state
          setEmail(data.usermail)
        }
      } catch (error) {
        console.error("Error during user verification:", error);
        removeCookie("jwt");
        navigate("/login");
      }
    };

    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
      removeCookie("jwt");
      navigate("/");
  };

  return (
    <>
      <LoadingBar waitingTime={2000} height={5} color='#3e4684' ref={ref} />
      {isAuthenticated && (
        <div className="screen-2">
          <h1>Successfully Authenticated</h1>
          <p>This page will contain a dashbaord which will allow users to manage and view the buses they are currently enrolled in</p>
          <p><span className="boold">Name: </span>{name}  <br /><span className="boold">E-Mail:</span> {email}</p>
          <button className="login" onClick={logOut}>Log out</button>
        </div>
      )}
      <ToastContainer />
    </>
  );
}
