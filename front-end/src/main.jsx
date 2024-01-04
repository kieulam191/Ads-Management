import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppProvider } from "./context/AppContext";
import SignInForm from "./components/officer/SignIn/SignInForm";
import SignUpForm from "./components/officer/SignUp/SignUpForm";
import ForgotPassForm from "./components/officer/SignIn/ForgotPasswordForm";
import OTPForm from "./components/officer/SignIn/OTPForm";
import ResetPassowordForm from "./components/officer/SignIn/ResetPasswordForm";
import AdboardListLocation from "./components/resident/AdBoardLocation";
import ReportForm from "./components/resident/report/ReportForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/adboardlistloc",
    element: <AdboardListLocation />,
  },
  {
    path: "/reports",
    element: <ReportForm />,
  },
  {
    path: "/officers/signup",
    element: <SignUpForm />,
  },
  {
    path: "/officers/signin",
    element: <SignInForm />,
  },
  {
    path: "/officers/forgot-password",
    element: <ForgotPassForm />,
  },
  {
    path: "/officers/auth/OTP",
    element: <OTPForm />,
  },
  {
    path: "/officers/resetpassword",
    element: <ResetPassowordForm />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
