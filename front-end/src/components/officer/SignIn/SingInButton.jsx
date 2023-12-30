// SignInButton.js
import React from "react";
import "../Button.css";
import { useParams, useHistory } from "react-router-dom";

const SignInButton = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/officers/signin");
  };
  return (
    <button onClick={handleClick} className="sign-in-button">
      Sign In
    </button>
  );
};

export default SignInButton;
