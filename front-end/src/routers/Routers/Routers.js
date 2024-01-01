import {
  createBrowserRouter
} from "react-router-dom";

import App from "../../App";
import ErrorPage from '../Error/ErrorPage'
import LoginPage from '../../pages/LoginPage'
import SignInForm from "../../components/officer/SignIn/SignInForm";
import SignUpForm from "../../components/officer/SignUp/SignUpForm";
import ForgotPassForm from "../../components/officer/SignIn/ForgotPasswordForm";
import ResetPassowordForm from "../../components/officer/SignIn/ResetPasswordForm";
import OTPForm from "../../components/officer/SignIn/OTPForm";
import AdBoardListLocation from "../../components/resident/AdBoardLocation";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/adboard-list-location",
      element: <AdBoardListLocation />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/reports",
      element: <ReportForm />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/officers/signup",
      element: <SignUpForm />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/officers/signin",
      element: <SignInForm />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/officers/forgot-password",
      element: <ForgotPassForm />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/officers/reset-password",
      element: <ResetPassowordForm />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/officers/auth/OTP",
      element: <OTPForm />,
      errorElement: <ErrorPage />,
    },
]);

export default router;