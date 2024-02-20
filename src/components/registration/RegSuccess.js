import React from "react";
import { useNavigate } from "react-router-dom";

const RegSuccess = () => {
  const naviagte = useNavigate();
  const handleLoginClick = () => {
    naviagte("/dashboard");
  };

  return (
    <div className="container">
      <h1 className="heading">Successfully Registered!</h1>
      <p className="message">
        Please press the button below to proceed to login.
      </p>
      <button className="button" onClick={handleLoginClick}>
        Procced to Dashboard
      </button>
    </div>
  );
};

export default RegSuccess;
