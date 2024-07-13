import React from "react";
import { Header } from "../components/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "../components/auth/Registration";
import Login from "../components/auth/Login";
import Home from "../components/body/Home";
import OtpVerification from "../components/auth/OtpVerification";
import AuthProvider from "../components/auth/AuthProvider";
import Logout from "../components/auth/Logout";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
        <Header />
              <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/otpVerification" element={<OtpVerification />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
