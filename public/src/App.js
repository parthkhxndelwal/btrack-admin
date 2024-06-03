import React from "react";
import Register from "./pages/Register/Register";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}
