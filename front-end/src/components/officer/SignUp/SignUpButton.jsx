// SignUpButton.js
import React from "react";
import "../Button.css";
import { useParams, useHistory } from "react-router-dom";

const SignUpButton = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/officers/signup");
  };
  return (
    <button onClick={handleClick} className="sign-up-button">
      Sign Up
    </button>
  );
};

export default SignUpButton;
