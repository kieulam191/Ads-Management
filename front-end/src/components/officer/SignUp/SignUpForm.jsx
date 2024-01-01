import React, { useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import axios from "../../../services/api";
import { AppContext } from "../../../context/AppContext";
import "../message.css";
import "../ButtonForm.css";

const SignUpForm = () => {
  const { id } = useParams();
  const history = useHistory();
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
      await axios.post("/auth/signup", values);

      console.log("dang ky thannh cong");
    },
  });

  return (
    <div>
      <h2>Sign up</h2>
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
          PassWord
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null}
        </label>
        <div className="btn">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;