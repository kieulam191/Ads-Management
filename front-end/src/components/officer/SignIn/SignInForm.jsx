import React, { useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useFormik, ErrorMessage } from "formik";
import axios from "../../../services/api";
import { AppContext } from "../../../context/AppContext";
import "../message.css";
import "../ButtonForm.css";

const SignInForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.username) {
        errors.username = "Required";
      }

      if (!values.password) {
        errors.password = "Required";
      }

      return errors;
    },
    onSubmit: async (values) => {
      await axios
        .post("/auth/signin", values)
        .then((res) => {
          console.log(res);
          //routing to page by role
        })
        .catch((err) => {
          formik.errors.username = err.response.data.message;
        });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label>
          Username
          <input
            type="text"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error">{formik.errors.username}</div>
          ) : null}
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
        </label>
        <div className="forgot-password-link">
          <Link to="/officers/forgot-password">Forgot Password?</Link>
        </div>
        <br />
        <div className="btn">
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
