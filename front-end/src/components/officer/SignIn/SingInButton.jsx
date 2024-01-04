// SignInButton.js
import React from "react";
import "../Button.css";
import { useParams, useNavigate } from "react-router-dom";

const SignInButton = () => {
  const history = useNavigate();
  const handleClick = () => {
    history("/officers/signin");
  };
  return (
    <button onClick={handleClick} className="sign-in-button">
      Sign In
    </button>
  );
};

export default SignInButton;
