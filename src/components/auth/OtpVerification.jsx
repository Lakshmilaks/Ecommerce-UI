import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function OtpVerification() {
  const [credentials, setCredentials] = useState({
    email: "",
    otp: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/users/otp",
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Includes cookies with the request
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="text-center">
        <h4 className="text-2xl text-green-800">Email Verification form</h4>
        <form
          className="border border-blue-950 w-2/5 ml-auto mr-auto mt-5 text-left pl-7"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            id="email"
          />
          <br />
          <br />
          <label htmlFor="/api/v1/users/otp">Email Otp</label>
          <br />
          <input
            type="number"
            name="otp"
            value={credentials.otp}
            onChange={handleChange}
            id="otp"
          />
          <br />
          <br />
          <input
            className="p-4 m-4 rounded bg-green-500"
            type="submit"
            value="Verified Email"
          />
          <input
            className="p-4 m-4 rounded bg-blue-400"
            type="reset"
            value="Reset"
          />
        </form>
      </div>
    </>
  );
}

export default OtpVerification;