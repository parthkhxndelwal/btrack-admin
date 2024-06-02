import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import LoadingBar from 'react-top-loading-bar'

export default function Cards() {
  const ref = useRef(null);
  const [name, setName] = useState('User');
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        // Start the loading bar immediately
        ref.current.staticStart();

        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          {
            withCredentials: true,
          }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else {
          // Simulate loading completion after 3 seconds
          setTimeout(() => {
            ref.current.complete();
          }, 1000);

          // Display the page content after 2 seconds of loading
          setTimeout(() => {
            toast(`Hi ${data.username} 🦄`, {
              theme: "dark",
            });
            setName(data.username);
          }, 2000);
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logOut = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  return (
    <>
      <LoadingBar color='#000000' ref={ref} />
      <div className="private">
        <h1>Welcome to BTrack, {name}</h1>
        <button onClick={logOut}>Log out</button>
      </div>
      <ToastContainer />
    </>
  );
}
