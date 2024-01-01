// SignInButton.js
import React from "react";
import "../Button.css";
import { useParams, useNavigate } from "react-router-dom";

const SignInButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/officers/signin");
  };
  return (
    <button onClick={handleClick} className="sign-in-button">
      Sign In
    </button>
  );
};

export default SignInButton;
