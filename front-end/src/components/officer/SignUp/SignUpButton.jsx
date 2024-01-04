// SignUpButton.js
import React from "react";
import "../Button.css";
import { useParams, useNavigate } from "react-router-dom";

const SignUpButton = () => {
  const history = useNavigate();
  const handleClick = () => {
    history("/officers/signup");
  };
  return (
    <button onClick={handleClick} className="sign-up-button">
      Sign Up
    </button>
  );
};

export default SignUpButton;
