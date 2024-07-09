import React from "react";
import { Header } from "../components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "../components/auth/Registration";
import Login from "../components/auth/Login";
import Home from "../components/body/Home";
import OtpVerification from "../components/auth/OtpVerification";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otpVerification" element={<OtpVerification />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
